package com.jsoncampos.covid19.models;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.google.gson.Gson;

@Document("series")
public class Series {
	
	@Id
	private String id;
	
	@Field("data")
	private Map<String,List<Object>> data;
	
	@Field("location")
	private Series.Location location;

	public Map<String,List<Object>> getData() {
		return data;
	}

	public void setData(Map<String,List<Object>> data) {
		this.data = data;
	}

	public Series.Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
	
	@Override
	public String toString() {
		return new Gson().toJson(this).toString();
	}
	
	public static class Location {
		@Field("region_id")
		private String regionId;
		
		@Field("municipality_id")
		private String municipalityId;
		
		@Field("_id")
		private String locationId;
		
		public String getRegionId() {
			return regionId;
		}

		public void setRegionId(String regionId) {
			this.regionId = regionId;
		}

		public String getMunicipalityId() {
			return municipalityId;
		}

		public void setMunicipalityId(String municipalityId) {
			this.municipalityId = municipalityId;
		}

		public String getLocationId() {
			return locationId;
		}

		public void setLocationId(String locationId) {
			this.locationId = locationId;
		}
	}
}
