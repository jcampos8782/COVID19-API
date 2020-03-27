[ ! -e "data" ] && mkdir data
[ ! -e "data/meta" ] && mkdir data/meta
[ ! -e "data/cases" ] && mkdir data/cases

force=""

if [[ "$1" == "-f" || "$1" == "--force" ]]; then
    echo "Forcing download of new files..."
    force="true"
fi

echo "------------------------"
echo "DOWNLOADING CSV FILES..."
echo "------------------------"

if [[  "$force" || ! -e "data/cases/global_confirmed.csv" ]]; then
  echo "Downloading global confirmed cases data..."
  wget -O data/cases/global_confirmed.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[  "$force" || ! -e "data/cases/global_deaths.csv" ]]; then
  echo "Downloading global confirmed cases data..."
  wget -O data/cases/global_deaths.csv "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
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
echo "Extracting lat/lon coordinates..."
cut -f1,2,3,4 -d','  data/cases/global_confirmed.csv | grep -iv "Lat,Long"> data/meta/coordinates.csv

echo "------------------------"
echo "COMPLETE!"
echo "------------------------"
echo ""
