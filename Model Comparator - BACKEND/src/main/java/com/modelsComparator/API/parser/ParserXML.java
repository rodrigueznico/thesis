package com.modelsComparator.API.parser;

import java.io.IOException;

import com.modelsComparator.API.domain.DataModel;

import uniagro.ddr_project.controller.DDRController;
import uniagro.ddr_project.ddr_models_admin.calc_indicators.CalculateAllIndicators;
import uniagro.ddr_project.ddr_models_admin.models_comparator.models_list.subject.ModelsList;
import uniagro.ddr_project.ddr_models_admin.models_comparator.models_list.subject.StableModel;
import uniagro.ddr_project.ddr_models_admin.models_comparator.mvc.ModelsComparatorModel;

public class ParserXML {
	
	private FileXML file;
	
	public ParserXML() {
		file = new FileXML();
	}
	
	@SuppressWarnings("unused")
	public DataModel parser (String data, String name) throws IOException {
		
		String pathFile = file.createFile(data, name);
		
		DDRController dDRController = new DDRController();
		ModelsList modelsList = new ModelsList();
		ModelsComparatorModel modelsComparatorModel = new ModelsComparatorModel(modelsList, dDRController);
	
	    StableModel stableModel = new StableModel(name, false);
	    CalculateAllIndicators calculateAllIndicators = new CalculateAllIndicators(stableModel, modelsComparatorModel.getdDRController(), pathFile);
	    modelsComparatorModel.addModel(stableModel);
	    file.deleteFiles(name);
	    return loadData(stableModel);
	}
	
	public DataModel loadData (StableModel stableModel) {
		DataModel dataModel = new DataModel();
		
		dataModel.setCant_vacas(stableModel.getCantVacas().getValue());
		dataModel.setCant_vaquillonas(stableModel.getCantVaquillonas().getValue());
		dataModel.setCarga_ev_ha(stableModel.getCargaEVxHA().getValue());
		dataModel.setCostos_directos_hs(stableModel.getCostosDirectosXHa().getValue());
		dataModel.setDist_prenez_vacas(stableModel.getDistribucionDePrenezVacas().getValue());
		dataModel.setDist_prenez_vaquillonas(stableModel.getDistribucionDePrenezVaquillonas().getValue());
		dataModel.setEdad_servicio_vaquillonas(stableModel.getEdadServicioVaquillonasEnMeses().getValue());
		dataModel.setGastos_directos_ha(stableModel.getGastosDirectosXHa().getValue());
		dataModel.setHas_ganaderas_afectivas(stableModel.getHectareasGanaderasEfectivas().getValue());
		dataModel.setIngreso_neto_ha(stableModel.getIngresoNetoXHa().getValue());
		dataModel.setMb_largo_plazo(stableModel.getMargenBrutoLargoPlazoXHa().getValue());
		dataModel.setPrecio_terneros_machos(stableModel.getPrecioTerneroMacho().getValue());
		dataModel.setProd_carne_ev(stableModel.getProduccionDeCarneXEV().getValue());
		dataModel.setProd_carne_ha(stableModel.getProduccionDeCarneXHa().getValue());
		dataModel.setProd_carne_racion(stableModel.getProduccionDeCarneXRacionProducida().getValue());
		dataModel.setProm_diario_balance_preliminar(stableModel.getPromedioDiarioBalancePreliminar().getValue());
		dataModel.setProm_diario_oferta(stableModel.getPromedioDiarioOferta().getValue());
		dataModel.setProm_diario_req(stableModel.getPromedioDiarioRequerimientos().getValue());
		dataModel.setReceptividad_racion_ha(stableModel.getReceptividadRacionesXHa().getValue());
		dataModel.setTasa_prenez(stableModel.getTasaDePrenez().getValue());
		dataModel.setVientre_servicio(stableModel.getVientresAservicio().getValue());
		
		return dataModel;
	}

}
