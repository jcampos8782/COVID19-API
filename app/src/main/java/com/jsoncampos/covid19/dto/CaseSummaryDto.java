package com.jsoncampos.covid19.dto;

import java.util.List;

public class CaseSummaryDto {
	private List<Integer> confirmed;
	private List<Integer> deaths;
	
	public List<Integer> getConfirmed() {
		return confirmed;
	}
	public void setConfirmed(List<Integer> confirmed) {
		this.confirmed = confirmed;
	}
	public List<Integer> getDeaths() {
		return deaths;
	}
	public void setDeaths(List<Integer> deaths) {
		this.deaths = deaths;
	}
}
