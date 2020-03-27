package com.jsoncampos.covid19.dto;

public class LocationDto {
	private String municipalityId;
	private String regionId;
	
	public String getMunicipalityId() {
		return municipalityId;
	}
	public void setMunicipalityId(String municipalityId) {
		this.municipalityId = municipalityId;
	}
	public String getRegionId() {
		return regionId;
	}
	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}	
}
