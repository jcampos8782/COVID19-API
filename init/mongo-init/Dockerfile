FROM ubuntu:bionic as importer

# Install wget and download data files from humdata.org
RUN apt-get update
RUN apt-get install wget -y

# Install python3 and the needed modules
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install pymongo

COPY download.sh download.sh
COPY main.py main.py

RUN chmod +x main.py
RUN chmod +x download.sh

RUN bash download.sh -f

CMD python3 main.py
