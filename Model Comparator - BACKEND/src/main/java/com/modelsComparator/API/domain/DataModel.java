package com.modelsComparator.API.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DataModel")
public class DataModel {
	
	@Id
    private String id;
	private String vientre_servicio;
	private String tasa_prenez;
	private String has_ganaderas_afectivas;
	private String prod_carne_ha;
	private String mb_largo_plazo;
	private String ingreso_neto_ha;
	private String gastos_directos_ha;
	private String costos_directos_hs;
	private String prod_carne_racion;
	private String prod_carne_ev;
	private String carga_ev_ha;
	private String precio_terneros_machos;
	private String edad_servicio_vaquillonas;
	private String prom_diario_req;
	private String prom_diario_oferta;
	private String prom_diario_balance_preliminar;
	private String receptividad_racion_ha;
	private String dist_prenez_vacas;
	private String dist_prenez_vaquillonas;
	private String cant_vacas;
	private String cant_vaquillonas;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getVientre_servicio() {
		return vientre_servicio;
	}
	public void setVientre_servicio(String vientre_servicio) {
		this.vientre_servicio = vientre_servicio;
	}
	public String getTasa_prenez() {
		return tasa_prenez;
	}
	public void setTasa_prenez(String tasa_prenez) {
		this.tasa_prenez = tasa_prenez;
	}
	public String getHas_ganaderas_afectivas() {
		return has_ganaderas_afectivas;
	}
	public void setHas_ganaderas_afectivas(String has_ganaderas_afectivas) {
		this.has_ganaderas_afectivas = has_ganaderas_afectivas;
	}
	public String getProd_carne_ha() {
		return prod_carne_ha;
	}
	public void setProd_carne_ha(String prod_carne_ha) {
		this.prod_carne_ha = prod_carne_ha;
	}
	public String getMb_largo_plazo() {
		return mb_largo_plazo;
	}
	public void setMb_largo_plazo(String mb_largo_plazo) {
		this.mb_largo_plazo = mb_largo_plazo;
	}
	public String getIngreso_neto_ha() {
		return ingreso_neto_ha;
	}
	public void setIngreso_neto_ha(String ingreso_neto_ha) {
		this.ingreso_neto_ha = ingreso_neto_ha;
	}
	public String getGastos_directos_ha() {
		return gastos_directos_ha;
	}
	public void setGastos_directos_ha(String gastos_directos_ha) {
		this.gastos_directos_ha = gastos_directos_ha;
	}
	public String getCostos_directos_hs() {
		return costos_directos_hs;
	}
	public void setCostos_directos_hs(String costos_directos_hs) {
		this.costos_directos_hs = costos_directos_hs;
	}
	public String getProd_carne_racion() {
		return prod_carne_racion;
	}
	public void setProd_carne_racion(String prod_carne_racion) {
		this.prod_carne_racion = prod_carne_racion;
	}
	public String getProd_carne_ev() {
		return prod_carne_ev;
	}
	public void setProd_carne_ev(String prod_carne_ev) {
		this.prod_carne_ev = prod_carne_ev;
	}
	public String getCarga_ev_ha() {
		return carga_ev_ha;
	}
	public void setCarga_ev_ha(String carga_ev_ha) {
		this.carga_ev_ha = carga_ev_ha;
	}
	public String getPrecio_terneros_machos() {
		return precio_terneros_machos;
	}
	public void setPrecio_terneros_machos(String precio_terneros_machos) {
		this.precio_terneros_machos = precio_terneros_machos;
	}
	public String getEdad_servicio_vaquillonas() {
		return edad_servicio_vaquillonas;
	}
	public void setEdad_servicio_vaquillonas(String edad_servicio_vaquillonas) {
		this.edad_servicio_vaquillonas = edad_servicio_vaquillonas;
	}
	public String getProm_diario_req() {
		return prom_diario_req;
	}
	public void setProm_diario_req(String prom_diario_req) {
		this.prom_diario_req = prom_diario_req;
	}
	public String getProm_diario_oferta() {
		return prom_diario_oferta;
	}
	public void setProm_diario_oferta(String prom_diario_oferta) {
		this.prom_diario_oferta = prom_diario_oferta;
	}
	public String getProm_diario_balance_preliminar() {
		return prom_diario_balance_preliminar;
	}
	public void setProm_diario_balance_preliminar(String prom_diario_balance_preliminar) {
		this.prom_diario_balance_preliminar = prom_diario_balance_preliminar;
	}
	public String getReceptividad_racion_ha() {
		return receptividad_racion_ha;
	}
	public void setReceptividad_racion_ha(String receptividad_racion_ha) {
		this.receptividad_racion_ha = receptividad_racion_ha;
	}
	public String getDist_prenez_vacas() {
		return dist_prenez_vacas;
	}
	public void setDist_prenez_vacas(String dist_prenez_vacas) {
		this.dist_prenez_vacas = dist_prenez_vacas;
	}
	public String getDist_prenez_vaquillonas() {
		return dist_prenez_vaquillonas;
	}
	public void setDist_prenez_vaquillonas(String dist_prenez_vaquillonas) {
		this.dist_prenez_vaquillonas = dist_prenez_vaquillonas;
	}
	public String getCant_vacas() {
		return cant_vacas;
	}
	public void setCant_vacas(String cant_vacas) {
		this.cant_vacas = cant_vacas;
	}
	public String getCant_vaquillonas() {
		return cant_vaquillonas;
	}
	public void setCant_vaquillonas(String cant_vaquillonas) {
		this.cant_vaquillonas = cant_vaquillonas;
	}

}
