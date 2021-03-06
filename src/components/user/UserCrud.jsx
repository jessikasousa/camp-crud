import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  icon: "users",
  title: "Resgatados",
  subtitle: "Cadastro de resgatados: Incluir, Listar, Alterar e Excluir!",
};

const baseUrl = "http://localhost:3001/users";
const initialState = {
  user: {
    name: "",
    age: "",
    blood: "",
    skill: "",
    injury: "",
    infected: "",
    capacity: "",
    observation: "",
  },
  list: [],
};

export default class UserCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user;
    const method = user.id ? "put" : "post";
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
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
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Idade</label>
              <input
                type="text"
                className="form-control"
                name="age"
                value={this.state.user.age}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite a idade..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Tipo Sangu??neo</label>
              <input
                type="text"
                className="form-control"
                name="blood"
                value={this.state.user.blood}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o tipo sangu??neo..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Habilidades</label>
              <input
                type="text"
                className="form-control"
                name="skill"
                value={this.state.user.skill}
                onChange={(e) => this.updateField(e)}
                placeholder="Cozinhar, mec??nica, habilidades manuais, professoral, enfermagem...."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Ferida</label>
              <input
                type="text"
                className="form-control"
                name="injury"
                value={this.state.user.injury}
                onChange={(e) => this.updateField(e)}
                placeholder="Sim ou n??o?"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Infectada</label>
              <input
                type="text"
                className="form-control"
                name="infected"
                value={this.state.user.infected}
                onChange={(e) => this.updateField(e)}
                placeholder="Sim ou n??o?"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Capacidade de trabalhar</label>
              <input
                type="text"
                className="form-control"
                name="capacity"
                value={this.state.user.capacity}
                onChange={(e) => this.updateField(e)}
                placeholder="Sim ou n??o?"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Observa????es</label>
              <input
                type="text"
                className="form-control"
                name="observation"
                value={this.state.user.observation}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite as observa????es (at?? 244 caracteres)."
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

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
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
            <th>Idade</th>
            <th>Tipo Sangu??neo</th>
            <th>Tipo de Habilidades</th>
            <th>Ferida?</th>
            <th>Infectada?</th>
            <th>Possui capacidade de trabalhar?</th>
            <th>Observa????es</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.blood}</td>
          <td>{user.skill}</td>
          <td>{user.injury}</td>
          <td>{user.infected}</td>
          <td>{user.capacity}</td>
          <td>{user.observation}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}
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