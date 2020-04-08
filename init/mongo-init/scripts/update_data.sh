[ ! -e "../data/downloads/jhu/covid19" ] && mkdir -p ../data/downloads/jhu/covid19
[ ! -e "../data/processed/covid19" ] && mkdir -p ../data/processed/covid19

force=""

if [[ "$1" == "-f" || "$1" == "--force" ]]; then
    echo "Forcing download of new files..."
    force="true"
fi

echo "------------------------"
echo "DOWNLOADING CSV FILES..."
echo "------------------------"

if [[  "$force" || ! -e "../data/downloads/jhu/covid19/confirmed_global.csv" ]]; then
  echo "Downloading global confirmed cases data..."
  wget -O ../data/downloads/jhu/covid19/confirmed_global.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "../data/downloads/jhu/covid19/deaths_global.csv" ]]; then
  echo "Downloading global deaths cases data..."
  wget -O ../data/downloads/jhu/covid19/deaths_global.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "../data/downloads/jhu/covid19/confirmed_us.csv" ]]; then
  echo "Downloading US confirmed cases data..."
  wget -O ../data/downloads/jhu/covid19/confirmed_us.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "../data/downloads/jhu/covid19/deaths_us.csv" ]]; then
  echo "Downloading US deaths data..."
  wget -O ../data/downloads/jhu/covid19/deaths_us.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

echo "------------------------"
echo "DOWNLOADS COMPLETE!"
echo "------------------------"
echo ""

echo "------------------------"
echo "PREPARING METADATA..."
echo "------------------------"

# Quoted strings with commas break
sed  's/".*,.*"/Unknown/g' ../data/downloads/jhu/covid19/confirmed_global.csv > ../data/processed/covid19/confirmed.csv
sed  's/".*,.*"/Unknown/g' ../data/downloads/jhu/covid19/deaths_global.csv > ../data/processed/covid19/deaths.csv

echo "Extracting lat/lon coordinates..."
cut -f1,2,3,4 -d','  ../data/processed/covid19/confirmed.csv | grep -iv "Lat,Long" > ../data/meta/coordinates.csv


echo "------------------------"
echo "PROCESSING US DATA"
echo "------------------------"

python3  ../py/us_file_processor.py
cut -d',' -f1,2,3,4 ../data/processed/covid19/confirmed_us.csv >> ../data/meta/coordinates.csv
cat ../data/processed/covid19/confirmed_us.csv >> ../data/processed/covid19/confirmed.csv
cat ../data/processed/covid19/deaths_us.csv >> ../data/processed/covid19/deaths.csv
rm ../data/processed/covid19/confirmed_us.csv ../data/processed/covid19/deaths_us.csv

echo "------------------------"
echo "US DATA PROCESSING COMPLETE"
echo "------------------------"


echo "------------------------"
echo "PROCESSING MEXICO DATA"
echo "------------------------"

PYTHONPATH=../py/:$PYTHONPATH python3  ../py/scrapers/mexico/scraper.py
cut -d',' -f1,2,3,4 ../data/downloads/wikipedia/mexico/confirmed_mx.csv >> ../data/meta/coordinates.csv
cat ../data/downloads/wikipedia/mexico/confirmed_mx.csv >> ../data/processed/covid19/confirmed.csv
cat ../data/downloads/wikipedia/mexico/deaths_mx.csv >> ../data/processed/covid19/deaths.csv

echo "------------------------"
echo "MEXICO DATA PROCESSING COMPLETE"
echo "------------------------"


echo "------------------------"
echo "COMPLETE!"
echo "------------------------"
echo ""
