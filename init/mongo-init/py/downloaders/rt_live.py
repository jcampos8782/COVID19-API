import requests
from config import *


def download():
    response = requests.get(RT_LIVE_DOWNLOADER_URL, stream=True)
    with open(FILE_RT_LIVE, 'wb+') as out:
        for block in response.iter_content(chunk_size=1024):
            if block:
                out.write(block)


if __name__ == '__main__':
    download()
