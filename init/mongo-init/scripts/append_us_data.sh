cut -d',' -f1,2,3,4 imports/processed/confirmed.csv >> imports/meta/coordinates.csv
cat imports/processed/confirmed.csv >> imports/data/covid19/confirmed.csv
cat imports/processed/deaths.csv >> imports/data/covid19/deaths.csv
