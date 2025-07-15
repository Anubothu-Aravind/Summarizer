import requests

def ping_backend():
    url = 'https://summarizer-puxa.onrender.com/ping'
    try:
        res = requests.get(url, timeout=10)
        print(f'Success ✅: {res.status_code} | Response: {res.json()}')
        return True
    except Exception as e:
        print(f'❌ Failed to ping backend: {e}')
        return False

if __name__ == "__main__":
    ping_backend()
