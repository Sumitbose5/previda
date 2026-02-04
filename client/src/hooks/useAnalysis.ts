import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { showErrorToast, showInfoToast, showWarningToast, toastMessages } from '../utils/toastConfig';

interface AnalysisResult {
  themes: string[];
  pain_points: string[];
  video_ideas: { title: string; hook: string }[];
}

interface AnalysisRequest {
  url: string;
  api_key: string | null;
  provider: string;
}

const fetchAnalysis = async (request: AnalysisRequest, token: string): Promise<AnalysisResult> => {
  const response = await fetch('http://localhost:8000/generate-ideas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error('Analysis failed');
  }

  return response.json();
};

// Hook to get cached analysis data (doesn't trigger API call)
export const useAnalysisData = (url: string) => {
  return useQuery({
    queryKey: ['analysis', url],
    queryFn: () => {
      throw new Error('This should not be called');
    },
    enabled: false, // Never automatically fetch
    staleTime: Infinity, // Keep data fresh indefinitely
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
  });
};

// Hook to get all cached analysis data
export const useAllAnalysisData = () => {
  const queryClient = useQueryClient();
  
  const getAllCachedData = () => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    return queries
      .filter(query => query.queryKey[0] === 'analysis' && query.state.data)
      .map(query => ({
        url: query.queryKey[1] as string,
        data: query.state.data as AnalysisResult,
        updatedAt: query.state.dataUpdatedAt
      }))
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)); // Sort by most recent
  };

  return useQuery({
    queryKey: ['all-analysis'],
    queryFn: getAllCachedData,
    enabled: false,
    staleTime: 0, // Always refetch to get latest cache state
  });
};

export const useAnalysisMutation = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (url: string) => {
      const token = await getToken();
      const apiKey = localStorage.getItem('previda_api_key');
      const provider = localStorage.getItem('previda_provider') || 'groq';
      
      if (!apiKey) {
        showErrorToast(toastMessages.apiKeyMissing);
        throw new Error('API key not configured');
      }
      
      return fetchAnalysis({ url, api_key: apiKey, provider }, token!);
    },
    onSuccess: (data, url) => {
      // Cache the result with the URL as key
      queryClient.setQueryData(['analysis', url], data);
      
      // Also save to localStorage for persistence
      const existingData = JSON.parse(localStorage.getItem('analysis_cache') || '{}');
      existingData[url] = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem('analysis_cache', JSON.stringify(existingData));
      
      // Invalidate the all-analysis query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['all-analysis'] });
    },
    onError: (error: any) => {
      console.error('Analysis mutation error:', error);
      
      // Show specific error messages based on the error
      if (error.message?.includes('API key')) {
        showErrorToast(toastMessages.invalidApiKey);
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        showErrorToast(toastMessages.networkError);
      } else {
        showErrorToast(toastMessages.analysisError);
      }
    },
  });
};

// Utility function to restore data from localStorage
export const restoreAnalysisFromStorage = (queryClient: any) => {
  try {
    const cachedData = localStorage.getItem('analysis_cache');
    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      let restoredCount = 0;
      
      Object.entries(parsedCache).forEach(([url, item]: [string, any]) => {
        // Only restore if data is less than 24 hours old
        const isStale = Date.now() - item.timestamp > 1000 * 60 * 60 * 24;
        if (!isStale && item.data) {
          queryClient.setQueryData(['analysis', url], item.data);
          restoredCount++;
        }
      });
      
      if (restoredCount > 0) {
        showInfoToast(toastMessages.cacheRestored(restoredCount), { autoClose: 4000 });
      }
    }
  } catch (error) {
    console.warn('Failed to restore analysis cache:', error);
    showWarningToast(toastMessages.cacheRestoreError);
  }
};