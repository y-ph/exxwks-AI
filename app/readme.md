* Create a firewall rule to allow incoming tcp traffic on port 8088: `gcloud compute firewall-rules create allow-http-8088 --allow tcp:8088 --description "Allow incoming traffic on TCP port 8088" --direction INGRESS --target-tags http-server-8088`
* Apply the firewall rule to your instance: `gcloud compute instances add-tags exxwks --tags=http-server-8088`

* Export your model in Jupyter using `learn.export()`
* The exported file will be named `export.pkl` and be located in the learner's path (execute `learn.path` in Jupyter to check the path)
* Move the exported model to the folder models/export.pkl

* Install required libs on the GCP instance: `sudo /opt/anaconda3/bin/conda install -c conda-forge starlette uvicorn aiohttp`
* Determine the external IP adress of your GCP instance: `curl http://checkip.amazonaws.com`
* Change directory to the root of our workshop directory `cd /home/jupyter/tutorials/exxwks-AI`
* Start the application server: `python app/server.py serve`
* Browse app on your mobile or desktop using http://nn.nn.nn.nn:8088 (nn.nn.nn.nn = external IP see above)
* Customize the app to your liking
  * server.py contains the server side application code (python)
  * static/client.js contains the client side application code (JavaScript)
  * view/index.html contains the client side view (HTML, Bootstrap)