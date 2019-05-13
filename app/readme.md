* Allow incoming tcp traffic on port 8088: <TODO>
* First install required libs: sudo conda install -c conda-forge starlette uvicorn aiohttp
* Copy exported model to models/export.pkl
* Start server: python app/server.py serve
* Browse app using http://<External-IP>:8088 (get External-IP using gcloud compute instances list)