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

if [[  "$force" || ! -e "data/cases/confirmed.csv" || ! -e "data/cases/local_confirmed.csv" ]]; then
  echo "Downloading confirmed cases data..."
  wget -O /tmp/covid19_confirmed.csv "https://data.humdata.org/hxlproxy/data/download/time_series-ncov-Confirmed.csv?dest=data_edit&filter01=explode&explode-header-att01=date&explode-value-att01=value&filter02=rename&rename-oldtag02=%23affected%2Bdate&rename-newtag02=%23date&rename-header02=Date&filter03=rename&rename-oldtag03=%23affected%2Bvalue&rename-newtag03=%23affected%2Binfected%2Bvalue%2Bnum&rename-header03=Value&filter04=clean&clean-date-tags04=%23date&filter05=sort&sort-tags05=%23date&sort-reverse05=on&filter06=sort&sort-tags06=%23country%2Bname%2C%23adm1%2Bname&tagger-match-all=on&tagger-default-tag=%23affected%2Blabel&tagger-01-header=province%2Fstate&tagger-01-tag=%23adm1%2Bname&tagger-02-header=country%2Fregion&tagger-02-tag=%23country%2Bname&tagger-03-header=lat&tagger-03-tag=%23geo%2Blat&tagger-04-header=long&tagger-04-tag=%23geo%2Blon&header-row=1&url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_19-covid-Confirmed.csv"

  echo ""
  echo "Processing file..."
  egrep -v '^"' /tmp/covid19_confirmed.csv > data/cases/confirmed.csv
  egrep '^"' /tmp/covid19_confirmed.csv > data/cases/local_confirmed.csv
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of confirmed data"
fi

if [[ "$force" || ! -e "data/cases/deaths.csv" || ! -e "data/cases/local_deaths.csv" ]]; then
  echo "Downloading deaths data..."
  wget -O /tmp/covid19_deaths.csv "https://data.humdata.org/hxlproxy/data/download/time_series-ncov-Deaths.csv?dest=data_edit&filter01=explode&explode-header-att01=date&explode-value-att01=value&filter02=rename&rename-oldtag02=%23affected%2Bdate&rename-newtag02=%23date&rename-header02=Date&filter03=rename&rename-oldtag03=%23affected%2Bvalue&rename-newtag03=%23affected%2Bkilled%2Bvalue%2Bnum&rename-header03=Value&filter04=clean&clean-date-tags04=%23date&filter05=sort&sort-tags05=%23date&sort-reverse05=on&filter06=sort&sort-tags06=%23country%2Bname%2C%23adm1%2Bname&tagger-match-all=on&tagger-default-tag=%23affected%2Blabel&tagger-01-header=province%2Fstate&tagger-01-tag=%23adm1%2Bname&tagger-02-header=country%2Fregion&tagger-02-tag=%23country%2Bname&tagger-03-header=lat&tagger-03-tag=%23geo%2Blat&tagger-04-header=long&tagger-04-tag=%23geo%2Blon&header-row=1&url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_19-covid-Deaths.csv"

  echo ""
  echo "Processing file..."
  egrep -v '^"' /tmp/covid19_deaths.csv > data/cases/deaths.csv
  egrep '^"' /tmp/covid19_deaths.csv > data/cases/local_deaths.csv
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of deaths data"
fi

if [[ "$force" || ! -e "data/cases/recovered.csv" || ! -e "data/cases/local_recovered.csv" ]]; then
  echo "Downloading recoveries data..."
  wget -O /tmp/covid19_recovered.csv "https://data.humdata.org/hxlproxy/data/download/time_series-ncov-Recovered.csv?dest=data_edit&filter01=explode&explode-header-att01=date&explode-value-att01=value&filter02=rename&rename-oldtag02=%23affected%2Bdate&rename-newtag02=%23date&rename-header02=Date&filter03=rename&rename-oldtag03=%23affected%2Bvalue&rename-newtag03=%23affected%2Brecovered%2Bvalue%2Bnum&rename-header03=Value&filter04=clean&clean-date-tags04=%23date&filter05=sort&sort-tags05=%23date&sort-reverse05=on&filter06=sort&sort-tags06=%23country%2Bname%2C%23adm1%2Bname&tagger-match-all=on&tagger-default-tag=%23affected%2Blabel&tagger-01-header=province%2Fstate&tagger-01-tag=%23adm1%2Bname&tagger-02-header=country%2Fregion&tagger-02-tag=%23country%2Bname&tagger-03-header=lat&tagger-03-tag=%23geo%2Blat&tagger-04-header=long&tagger-04-tag=%23geo%2Blon&header-row=1&url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_19-covid-Recovered.csv"

  echo ""
  echo "Processing file..."
  egrep -v '^"' /tmp/covid19_recovered.csv > data/cases/recovered.csv
  egrep '^"' /tmp/covid19_recovered.csv > data/cases/local_recovered.csv
  echo "Complete!"
  echo ""
else
  echo "File exists. Skipping download of recovered data"
fi

echo "------------------------"
echo "DOWNLOADS COMPLETE!"
echo "------------------------"
echo ""
echo "------------------------"
echo "SCRUBBING DATA"
echo "------------------------"
# Fix some issues that will cause problems with keying with the meta collections
# Replace things like "The Bahamas" with "Bahamas"
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/"\(.*\), The"/The \1/g' data/cases/confirmed.csv
  sed -i '' 's/"\(.*\), The"/The \1/g' data/cases/recovered.csv
  sed -i '' 's/"\(.*\), The"/The \1/g' data/cases/deaths.csv

  # Replace Korea, South with South Korea
  sed -i '' 's/"Korea, South"/South Korea/g' data/cases/confirmed.csv
  sed -i '' 's/"Korea, South"/South Korea/g' data/cases/recovered.csv
  sed -i '' 's/"Korea, South"/South Korea/g' data/cases/deaths.csv
else
  sed -i 's/"\(.*\), The"/The \1/g' data/cases/confirmed.csv
  sed -i 's/"\(.*\), The"/The \1/g' data/cases/recovered.csv
  sed -i 's/"\(.*\), The"/The \1/g' data/cases/deaths.csv

  # Replace Korea, South with South Korea
  sed -i 's/"Korea, South"/South Korea/g' data/cases/confirmed.csv
  sed -i 's/"Korea, South"/South Korea/g' data/cases/recovered.csv
  sed -i 's/"Korea, South"/South Korea/g' data/cases/deaths.csv
fi

echo "------------------------"
echo "SCRUBBING COMPLETE"
echo "------------------------"
echo ""
echo "------------------------"
echo "PREPARING METADATA..."
echo "------------------------"
echo "Processing municipalities..."
cut -f1 -d','  data/cases/confirmed.csv | sed 's/"//' | sort | uniq | egrep ".+" | grep -v "^#" > data/meta/municipalities.csv
echo "Processing regions..."
cut -f2 -d','  data/cases/confirmed.csv | sed 's/"//' | sort | uniq | egrep ".+" | grep -v "^#" > data/meta/regions.csv

echo "------------------------"
echo "COMPLETE!"
echo "------------------------"
echo ""
