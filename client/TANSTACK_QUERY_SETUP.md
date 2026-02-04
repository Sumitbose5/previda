# TanStack Query Setup

This project now uses TanStack Query (formerly React Query) for efficient data fetching, caching, and state management.

## Features Implemented

### 1. Query Client Setup
- Configured in `App.tsx` with optimal default settings
- 5-minute stale time and 30-minute garbage collection time
- Wrapped the entire app with `QueryClientProvider`

### 2. Custom Hooks (`hooks/useAnalysis.ts`)
- `useAnalysisData(url)`: Gets cached analysis data without triggering API calls
- `useAnalysisMutation()`: Handles manual analysis requests and updates cache
- `useAllAnalysisData()`: Retrieves all cached analysis data for recent history
- `restoreAnalysisFromStorage()`: Restores data from localStorage on app start

### 3. Persistent Caching
- Saves analysis results to both TanStack Query cache and localStorage
- Restores cache on app initialization from localStorage
- Only restores data that's less than 24 hours old
- Dual persistence ensures data survives page refreshes and browser sessions

### 4. Updated Dashboard (`pages/DashboardPage.tsx`)
- **Manual API Calls**: Only makes API requests when "RUN AI" button is clicked
- **Smart Caching**: Shows cached data immediately when available
- **Recent History**: Displays recent analyses when no current data
- **Cache Indicators**: Shows when displaying cached vs fresh data
- **Persistent State**: Maintains analysis data across page refreshes

## Key Behaviors

### API Call Control
- **No Automatic Calls**: Pasting a URL does NOT trigger an API call
- **Button-Only Execution**: API calls only happen when clicking "RUN AI"
- **Cached Data Priority**: Shows cached data instantly if available

### Data Persistence
1. **TanStack Query Cache**: In-memory caching for current session
2. **localStorage**: Persistent storage across browser sessions
3. **Smart Restoration**: Only restores recent data (< 24 hours)
4. **Automatic Cleanup**: Old data is automatically removed

### User Experience
- Instant display of cached results
- Clear indicators when showing cached vs fresh data
- Recent analysis history for quick access
- Disabled button states during loading
- Error handling with console logging

## Benefits

1. **No Unwanted API Calls**: Complete control over when analysis runs
2. **Instant Loading**: Cached data appears immediately
3. **Persistent History**: Previous analyses survive browser restarts
4. **Smart Caching**: Automatic cache management and cleanup
5. **Better UX**: Clear loading states and cache indicators

## Usage

The dashboard now:
- Shows cached results instantly when available
- Only makes API calls when explicitly requested
- Maintains analysis history across sessions
- Provides clear feedback about data freshness
- Handles all loading and error states automatically