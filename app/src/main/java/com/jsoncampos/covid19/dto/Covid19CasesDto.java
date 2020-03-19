package com.jsoncampos.covid19.dto;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Date;

public class Covid19CasesDto {
	private Date date;
	private LocationDto location;
	private CasesSummaryDto cases;
	
	public LocationDto getLocation() {
		return location;
	}

	public void setLocation(LocationDto location) {
		this.location = location;
	}

	public CasesSummaryDto getSummary() {
		return cases;
	}

	public void setSummary(CasesSummaryDto summary) {
		this.cases = summary;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public static class Builder {
		private Covid19CasesDto dto;
		
		public Builder() {
			this.dto = new Covid19CasesDto();
			this.dto.location = new LocationDto();
			this.dto.cases = new CasesSummaryDto();
		}
		
		public Builder withDate(Date date) {
			dto.date = date;
			return this;
		}
		
		public Builder withLocation(String municipality, String region) {
			dto.location.setMunicipality(municipality);
			dto.location.setRegion(region);
			return this;
		}
		
		public Builder withGeocoordinates(double latitude, double longitude) {
			dto.location.setLatitude(latitude);
			dto.location.setLongitude(longitude);
			return this;
		}
		
		public Builder withData(int confirmed, int deaths, int recovered) {
			dto.cases.setConfirmed(confirmed);
			dto.cases.setDeaths(deaths);
			dto.cases.setRecovered(recovered);
			return this;
		}
		
		public Covid19CasesDto build() {
			checkArgument(Math.abs(dto.location.getLatitude()) <= 90, String.format("Invalid latitude: %s", dto.location.getLatitude()));
			checkArgument(Math.abs(dto.location.getLongitude()) <= 180, String.format("Invalid longitude: %s", dto.location.getLongitude()));
			checkArgument(dto.cases.getConfirmed() >= 0, String.format("Invalid number of confirmed cases: %d", dto.cases.getConfirmed()));
			checkArgument(dto.cases.getDeaths() >= 0, String.format("Invalid number of deaths: %d", dto.cases.getDeaths()));
			checkArgument(dto.cases.getRecovered() >= 0, String.format("Invalid number of recoveries: %d", dto.cases.getRecovered()));
			checkNotNull(dto.date, "Date cannot be null");
			return dto;
		}
	}
}
