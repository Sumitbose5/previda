#!/usr/bin/env python3
"""
Simple script to test the deployed FastAPI backend
Run this after deployment to verify everything works
"""

import requests
import json
import sys

def test_health_check(base_url):
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{base_url}/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_cors(base_url):
    """Test CORS headers"""
    try:
        response = requests.options(f"{base_url}/generate-ideas")
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
        }
        print(f"✅ CORS headers: {cors_headers}")
        return True
    except Exception as e:
        print(f"❌ CORS test error: {e}")
        return False

def main():
    if len(sys.argv) != 2:
        print("Usage: python test_deployment.py <backend_url>")
        print("Example: python test_deployment.py https://your-backend.vercel.app")
        sys.exit(1)
    
    base_url = sys.argv[1].rstrip('/')
    
    print(f"Testing deployment at: {base_url}")
    print("-" * 50)
    
    # Run tests
    health_ok = test_health_check(base_url)
    cors_ok = test_cors(base_url)
    
    print("-" * 50)
    if health_ok and cors_ok:
        print("🎉 All tests passed! Deployment looks good.")
    else:
        print("⚠️  Some tests failed. Check the logs above.")
        sys.exit(1)

if __name__ == "__main__":
    main()