package com.jsoncampos.seriesapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "recovered", "tests", "hospitalizations", "sipOrderDate", "dateModified" })
public class FactsDto {
	private Integer recovered;
	private TestingResults tests;
	private HospitalizationStatistics hospitalizations;
	private String sipOrderDate;
	
	public Integer getRecovered() {
		return recovered;
	}

	public void setRecovered(Integer recovered) {
		this.recovered = recovered;
	}

	public TestingResults getTests() {
		return tests;
	}

	public void setTests(TestingResults tests) {
		this.tests = tests;
	}

	public HospitalizationStatistics getHospitalizations() {
		return hospitalizations;
	}

	public void setHospitalizations(HospitalizationStatistics hospitalizations) {
		this.hospitalizations = hospitalizations;
	}
	
	public String getSipOrderDate() {
		return sipOrderDate;
	}
	
	public void setSipOrderDate(String sipOrderDate) {
		this.sipOrderDate = sipOrderDate;
	}

	public static class TestingResults {
		private Integer positive;
		private Integer negative;
		private Integer pending;
		
		public TestingResults(Integer positive, Integer negative, Integer pending) {
			this.positive = positive;
			this.negative = negative;
			this.pending = pending;
		}
		
		public Integer getPositive() {
			return positive;
		}
		public void setPositive(Integer positive) {
			this.positive = positive;
		}
		public Integer getNegative() {
			return negative;
		}
		public void setNegative(Integer negative) {
			this.negative = negative;
		}
		public Integer getPending() {
			return pending;
		}
		public void setPending(Integer pending) {
			this.pending = pending;
		}
	}
	
	public static class HospitalizationStatistics {
		private Statistics cumulative;
		private Statistics current;
		
		public Statistics getCumulative() {
			return cumulative;
		}
		public void setCumulative(Statistics cumulative) {
			this.cumulative = cumulative;
		}
		public Statistics getCurrent() {
			return current;
		}
		public void setCurrent(Statistics current) {
			this.current = current;
		}
	}
	
	public static class Statistics {
		private Integer admitted;
		private Integer intensiveCare;
		private Integer onVentilator;
		
		public Statistics(Integer admitted, Integer intensiveCare, Integer onVentilator) {
			this.admitted = admitted;
			this.intensiveCare = intensiveCare;
			this.onVentilator = onVentilator;
		}
		
		public Integer getAdmitted() {
			return admitted;
		}
		public void setAdmitted(Integer admitted) {
			this.admitted = admitted;
		}
		public Integer getIntensiveCare() {
			return intensiveCare;
		}
		public void setIntensiveCare(Integer intensiveCare) {
			this.intensiveCare = intensiveCare;
		}
		public Integer getOnVentilator() {
			return onVentilator;
		}
		public void setOnVentilator(Integer onVentilator) {
			this.onVentilator = onVentilator;
		}
	}
	
	public static class Builder {
		private FactsDto dto;
		
		public Builder() {
			dto = new FactsDto();
			dto.setHospitalizations(new HospitalizationStatistics());
		}
		
		public Builder withRecovered(Integer recovered) {
			dto.recovered = recovered;
			return this;
		}
		
		public Builder withTestingStatistics(Integer positive, Integer negative, Integer pending) {
			dto.setTests(new TestingResults(positive, negative, pending));
			return this;
		}
		
		public Builder withCurrentHospitalizations(Integer admitted, Integer inIcu, Integer onVentilator) {
			dto.getHospitalizations().setCurrent(new Statistics(admitted, inIcu, onVentilator));
			return this;
		}
		
		public Builder withCumulativeHospitalizations(Integer admitted, Integer inIcu, Integer onVentilator) {
			dto.getHospitalizations().setCumulative(new Statistics(admitted, inIcu, onVentilator));
			return this;
		}
		
		public Builder withSipOrderDate(String sipOrderDate) {
			dto.setSipOrderDate(sipOrderDate);
			return this;
		}
		
		public FactsDto build() {
			return dto;
		}
	}
}
