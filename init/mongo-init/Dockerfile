FROM ubuntu:bionic as importer

# Install wget and download data files from humdata.org
RUN apt-get update
RUN apt-get install wget -y

# Install python3 and the needed modules
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install pymongo
RUN python3 -m pip install requests
RUN mkdir data
RUN mkdir python

COPY data/meta data/meta
COPY data/processed data/processed
COPY py py

RUN chmod +x py/import.py
CMD python3 py/import.py
