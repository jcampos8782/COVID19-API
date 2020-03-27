package com.jsoncampos.covid19.dto;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.List;

public class Covid19CasesDto {
	private LocationDto location;
	private CaseSummaryDto cases;
	
	public LocationDto getLocation() {
		return location;
	}

	public void setLocation(LocationDto location) {
		this.location = location;
	}

	public CaseSummaryDto getSummary() {
		return cases;
	}

	public void setSummary(CaseSummaryDto summary) {
		this.cases = summary;
	}

	public static class Builder {
		private Covid19CasesDto dto;
		
		public Builder() {
			this.dto = new Covid19CasesDto();
			this.dto.location = new LocationDto();
			this.dto.cases = new CaseSummaryDto();
		}
		
		
		public Builder withLocation(String municipalityId, String regionId) {
			dto.location.setMunicipalityId(municipalityId);
			dto.location.setRegionId(regionId);
			return this;
		}
		
		
		public Builder withData(List<Integer> confirmed, List<Integer> deaths) {
			dto.cases.setConfirmed(confirmed);
			dto.cases.setDeaths(deaths);
			return this;
		}
		
		public Covid19CasesDto build() {
			checkNotNull(dto.getLocation(), "Location cannot be null");
			checkNotNull(dto.getLocation().getRegionId(), "Region cannot be null");
			checkNotNull(dto.cases.getConfirmed(), "Confirmed cases time series not set");
			checkNotNull(dto.cases.getDeaths(), "Deaths time series not set");
			return dto;
		}
	}
}
