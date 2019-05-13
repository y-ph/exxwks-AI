* Install required libs: sudo conda install -c conda-forge starlette uvicorn aiohttp
* Copy exported model to models/export.pkl
* Create firewall rule to allow incoming tcp traffic on port 8088: gcloud compute firewall-rules create allow-http-8088 --allow tcp:8088 --description "Allow incoming traffic on TCP port 8088" --direction INGRESS --target-tags http-server-8088
* Apply firewall rule to your instance: gcloud compute instances add-tags exxwks --tags=http-server-8088
* Start server: python app/server.py serve
* Browse app using http://<External-IP>:8088 (get External-IP using gcloud compute instances list)