from minio import Minio
from minio.error import ResponseError
from pathlib import Path
import os

p = Path('./apps').glob('**/*')


def upload_apps_to_minio():
    minio_client = Minio('minio:9000', access_key='walkoff', secret_key='walkoff123', secure=False)
    try:
        buckets = minio_client.list_buckets()
        for bucket in buckets:
            if bucket.name == "apps-bucket":
                flag = True
    except:
        flag = False

    if flag is not True:
        minio_client.make_bucket("apps-bucket", location="us-east-1")

    files = [x for x in p if x.is_file()]
    for file in files:
        path_to_file = str(file)
        with open(path_to_file, "rb") as file_data:
            file_stat = os.stat(path_to_file)
            minio_client.put_object("apps-bucket", path_to_file, file_data, file_stat.st_size)

