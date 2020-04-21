[ ! -e "./data/processed/covid19" ] && mkdir -p ./data/processed/covid19
[ ! -e "./data/downloads/github/CSSEGISandData" ] && mkdir -p ./data/downloads/github/CSSEGISandData
[ ! -e "./data/downloads/covidtracking" ] && mkdir -p ./data/downloads/covidtracking

force=""

if [[ "$1" == "-f" || "$1" == "--force" ]]; then
    echo "Forcing download of new files..."
    force="true"
fi

echo "------------------------"
echo "DOWNLOADING CSV FILES..."
echo "------------------------"

if [[ "$force" || ! -e "./data/downloads/github/CSSEGISandData/regions.csv" ]]; then
  echo "Downloading regional metadata"
  wget -O ./data/downloads/github/CSSEGISandData/regions.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of regional metadata"
fi

if [[  "$force" || ! -e "./data/downloads/github/CSSEGISandData/confirmed_global.csv" ]]; then
  echo "Downloading global confirmed cases data..."
  wget -O ./data/downloads/github/CSSEGISandData/confirmed_global.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "./data/downloads/github/CSSEGISandData/deaths_global.csv" ]]; then
  echo "Downloading global deaths cases data..."
  wget -O ./data/downloads/github/CSSEGISandData/deaths_global.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "./data/downloads/github/CSSEGISandData/confirmed_us.csv" ]]; then
  echo "Downloading US confirmed cases data..."
  wget -O ./data/downloads/github/CSSEGISandData/confirmed_us.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "./data/downloads/github/CSSEGISandData/deaths_us.csv" ]]; then
  echo "Downloading US deaths data..."
  wget -O ./data/downloads/github/CSSEGISandData/deaths_us.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "./data/downloads/github/carranco-sga/Mexico_COVID19_CTD.csv" ]]; then
  echo "Downloading MX data..."
  wget -O ./data/downloads/github/carranco-sga/mx_data.csv "https://raw.githubusercontent.com/carranco-sga/Mexico-COVID-19/master/Mexico_COVID19_CTD.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "./data/downloads/covidtracking/us_current.csv" ]]; then
  echo "Downloading CovidTracking.com current US data..."
  wget -O ./data/downloads/covidtracking/us_current.csv "https://covidtracking.com/api/v1/us/current.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "./data/downloads/covidtracking/states_current.csv" ]]; then
  echo "Downloading CovidTracking.com current State data..."
  wget -O ./data/downloads/covidtracking/states_current.csv "https://covidtracking.com/api/v1/states/current.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "./data/downloads/covidtracking/states_meta.csv" ]]; then
  echo "Downloading CovidTracking.com current US data..."
  wget -O ./data/downloads/covidtracking/states_meta.csv "https://covidtracking.com/api/v1/states/info.json"
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
echo "PROCESSING DOWNLOADS"
echo "------------------------"

echo "Extracting COVID-19 columns"
cut -d ',' -f 5- ./data/downloads/github/CSSEGISandData/confirmed_global.csv | head -n 1 > ./data/meta/covid19.csv

PYTHONPATH=./init/mongo-init/py/:$PYTHONPATH python3  ./init/mongo-init/py/preprocessors/meta.py
PYTHONPATH=./init/mongo-init/py/:$PYTHONPATH python3  ./init/mongo-init/py/preprocessors/global.py
PYTHONPATH=./init/mongo-init/py/:$PYTHONPATH python3  ./init/mongo-init/py/preprocessors/us.py
PYTHONPATH=./init/mongo-init/py/:$PYTHONPATH python3  ./init/mongo-init/py/preprocessors/mx.py

echo "------------------------"
echo "PROCESSING COMPLETE"
echo "------------------------"

echo "------------------------"
echo "AGGREGATING DATA FILES"
echo "------------------------"

if [[ -e "./data/processed/covid19/confirmed.csv" ]]; then
  rm ./data/processed/covid19/confirmed.csv
fi

touch ./data/processed/covid19/confirmed.csv
cat ./data/processed/covid19/confirmed_global.csv >> ./data/processed/covid19/confirmed.csv
cat ./data/processed/covid19/confirmed_us.csv >> ./data/processed/covid19/confirmed.csv
cat ./data/processed/covid19/confirmed_mx.csv >> ./data/processed/covid19/confirmed.csv

if [[ -e "./data/processed/covid19/deaths.csv" ]]; then
  rm ./data/processed/covid19/deaths.csv
fi

touch ./data/processed/covid19/deaths.csv
cat ./data/processed/covid19/deaths_global.csv >> ./data/processed/covid19/deaths.csv
cat ./data/processed/covid19/deaths_us.csv >> ./data/processed/covid19/deaths.csv
cat ./data/processed/covid19/deaths_mx.csv >> ./data/processed/covid19/deaths.csv

echo "------------------------"
echo "AGGREGATION COMPLETE"
echo "------------------------"

echo "------------------------"
echo "CLEANING UP..."
echo "------------------------"

rm ./data/processed/covid19/confirmed_global.csv ./data/processed/covid19/deaths_global.csv
rm ./data/processed/covid19/confirmed_us.csv ./data/processed/covid19/deaths_us.csv
rm ./data/processed/covid19/confirmed_mx.csv ./data/processed/covid19/deaths_mx.csv

echo "------------------------"
echo "COMPLETE!"
echo "------------------------"
echo ""
