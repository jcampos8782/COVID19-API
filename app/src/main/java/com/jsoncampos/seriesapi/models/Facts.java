package com.jsoncampos.seriesapi.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Document("facts")
public class Facts {
	@Id
	private String id;
	@Field("region_id")
	private String regionId;
	
	@Field("recovered")
	private Integer recovered;
	
	@Field("positiveTests")
	private Integer positiveTests;
	@Field("negativeTests")
	private Integer negativeTests;
	@Field("pendingTests")
	private Integer pendingTests;

	@Field("hospitalizedCumulative")
	private Integer hospitalizedCumulative;
	@Field("inIcuCumulative")
	private Integer intensiveCareCumulative;
	@Field("onVentilatorCumulative")
	private Integer onVentilatorCumulative;	
	
	@Field("hospitalizedCurrently")
	private Integer hospitalizedCurrent;
	@Field("inIcuCurrently")
	private Integer intensiveCareCurrent;
	@Field("onVentilatorCurrently")
	private Integer onVentilatorCurrent;
	
	public String getId() {
		return this.id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRegionId() {
		return this.regionId;
	}
	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}
	public Integer getRecovered() {
		return recovered;
	}

	public void setRecovered(Integer recovered) {
		this.recovered = recovered;
	}

	public Integer getPositiveTests() {
		return positiveTests;
	}

	public void setPositiveTests(Integer positiveTests) {
		this.positiveTests = positiveTests;
	}

	public Integer getNegativeTests() {
		return negativeTests;
	}

	public void setNegativeTests(Integer negativeTests) {
		this.negativeTests = negativeTests;
	}

	public Integer getPendingTests() {
		return pendingTests;
	}

	public void setPendingTests(Integer pendingTests) {
		this.pendingTests = pendingTests;
	}

	public Integer getHospitalizedCumulative() {
		return hospitalizedCumulative;
	}

	public void setHospitalizedCumulative(Integer hospitalizedCumulative) {
		this.hospitalizedCumulative = hospitalizedCumulative;
	}

	public Integer getIntensiveCareCumulative() {
		return intensiveCareCumulative;
	}

	public void setIntensiveCareCumulative(Integer intensiveCareCumulative) {
		this.intensiveCareCumulative = intensiveCareCumulative;
	}

	public Integer getOnVentilatorCumulative() {
		return onVentilatorCumulative;
	}

	public void setOnVentilatorCumulative(Integer onVentilatorCumulative) {
		this.onVentilatorCumulative = onVentilatorCumulative;
	}

	public Integer getHospitalizedCurrent() {
		return hospitalizedCurrent;
	}

	public void setHospitalizedCurrent(Integer hospitalizedCurrent) {
		this.hospitalizedCurrent = hospitalizedCurrent;
	}

	public Integer getIntensiveCareCurrent() {
		return intensiveCareCurrent;
	}

	public void setIntensiveCareCurrent(Integer intensiveCareCurrent) {
		this.intensiveCareCurrent = intensiveCareCurrent;
	}

	public Integer getOnVentilatorCurrent() {
		return onVentilatorCurrent;
	}

	public void setOnVentilatorCurrent(Integer onVentilatorCurrent) {
		this.onVentilatorCurrent = onVentilatorCurrent;
	}
}
