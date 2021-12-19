import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  icon: "camps",
  title: "Acampamentos",
  subtitle: "Cadastro de acampamentos: Incluir, Listar, Alterar e Excluir!",
};

const baseUrl = "http://localhost:3001/camps";
const initialState = {
  camp: {
    name: "",
    people: "",
    activity: "",
    limit: "",
    color: "",
  },
  list: [],
};

export default class CampCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ camp: initialState.camp });
  }

  save() {
    const camp = this.state.camp;
    const method = camp.id ? "put" : "post";
    const url = camp.id ? `${baseUrl}/${camp.id}` : baseUrl;
    axios[method](url, camp).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ camp: initialState.camp, list });
    });
  }

  getUpdatedList(camp, add = true) {
    const list = this.state.list.filter((u) => u.id !== camp.id);
    if (add) list.unshift(camp);
    return list;
  }

  updateField(event) {
    const camp = { ...this.state.camp };
    camp[event.target.name] = event.target.value;
    this.setState({ camp });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.camp.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome do acampamento..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Ocupantes</label>
              <input
                type="text"
                className="form-control"
                name="people"
                value={this.state.camp.people}
                onChange={(e) => this.updateField(e)}
                placeholder="Pessoas que estão ocupando o acampamento..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Atividades</label>
              <input
                type="text"
                className="form-control"
                name="activity"
                value={this.state.camp.activity}
                onChange={(e) => this.updateField(e)}
                placeholder=" Lista de atividades que precisam ser realizadas..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Limite</label>
              <input
                type="text"
                className="form-control"
                name="limit"
                value={this.state.camp.limit}
                onChange={(e) => this.updateField(e)}
                placeholder="Limite de pessoas que o acampamento comporta...."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Cor do acampamento</label>
              <input
                type="text"
                className="form-control"
                name="color"
                value={this.state.camp.color}
                onChange={(e) => this.updateField(e)}
                placeholder="Qual a cor deste acampamento?"
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>

            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(camp) {
    this.setState({ camp });
  }

  remove(camp) {
    axios.delete(`${baseUrl}/${camp.id}`).then((resp) => {
      const list = this.getUpdatedList(camp, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ocupantes</th>
            <th>Atividades</th>
            <th>Limite</th>
            <th>Cor</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((camp) => {
      return (
        <tr key={camp.id}>
          <td>{camp.id}</td>
          <td>{camp.name}</td>
          <td>{camp.people}</td>
          <td>{camp.activity}</td>
          <td>{camp.limit}</td>
          <td>{camp.color}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(camp)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(camp)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
