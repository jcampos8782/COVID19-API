[ ! -e "imports/data/covid19" ] && mkdir -p imports/data/covid19
[ ! -e "imports/raw" ] && mkdir -p imports/raw
[ ! -e "imports/processed"] && mkdir -p imports/processed

force=""

if [[ "$1" == "-f" || "$1" == "--force" ]]; then
    echo "Forcing download of new files..."
    force="true"
fi

echo "------------------------"
echo "DOWNLOADING CSV FILES..."
echo "------------------------"

if [[  "$force" || ! -e "imports/data/covid19/confirmed.csv" ]]; then
  echo "Downloading global confirmed cases data..."
  wget -O /tmp/confirmed.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "imports/data/covid19/deaths.csv" ]]; then
  echo "Downloading global deaths cases data..."
  wget -O /tmp/deaths.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "imports/raw/confirmed_us.csv" ]]; then
  echo "Downloading US confirmed cases data..."
  wget -O ./imports/raw/confirmed.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "imports/raw/deaths.csv" ]]; then
  echo "Downloading US deaths data..."
  wget -O ./imports/raw/deaths.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"
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
sed  's/".*,.*"/Unknown/g' /tmp/confirmed.csv > imports/data/covid19/confirmed.csv
sed  's/".*,.*"/Unknown/g' /tmp/deaths.csv > imports/data/covid19/deaths.csv

echo "Extracting lat/lon coordinates..."
cut -f1,2,3,4 -d','  imports/data/covid19/confirmed.csv | grep -iv "Lat,Long" > imports/meta/coordinates.csv

echo "------------------------"
echo "COMPLETE!"
echo "------------------------"
echo ""
