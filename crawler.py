import json
import urllib3
import re

urllib3.disable_warnings()
http = urllib3.PoolManager()

PRODUCT_LIST_URL = 'https://www.zalora.sg/_c/rpc?&req={"method":"Costa.ListCatalogProducts","params":[{"category_id":[""],"limit":99,"offset":99,"dir":"desc","sort":"popularity","all_products":true,"catalog_type":"","url_key":"/all-products"}]}&lang=en'


def download_json():
    request = http.request('GET', PRODUCT_LIST_URL)
    return json.loads(request.data)

def get_original_image(url):
    result = re.search('/(http://static\..*$)', url)
    return result.group(1)

def get_image_urls(data):
    return [doc['image'] for doc in data['result']['response']['docs']]

def download_image(image):
    request = http.request('GET', image)
    open('images/%s' % (image.split('/')[-1]), 'wb').write(request.data)

data = download_json()
urls = get_image_urls(data)
original_urls = [get_original_image(url) for url in urls]

for url in original_urls:
    print 'Download %s' % url
    download_image(url)
