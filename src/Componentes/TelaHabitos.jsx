import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AiFillPlusSquare } from "react-icons/ai";
import { TrashFill } from "@styled-icons/bootstrap/TrashFill";
import UsuarioContext from "./contextos/UsuarioContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

function TelaHabitos() {
  const [habitos, setHabitos] = useState([]);
  const [novoHabito, setNovoHabito] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nomeHabito, setNomeHabito] = useState("");
  const [selecionado, setSelecionado] = useState([]);
  const [atualiza, setAtualiza] = useState(false);
  const { usuario } = useContext(UsuarioContext);
  const { imagem } = useContext(UsuarioContext);


  function buscarHabitos() {
    const config = {
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    };
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const promisse = axios.get(URL, config);

    promisse.then((response) => {
      const { data } = response;
      setHabitos(data);
    });

    promisse.catch((err) => {
      console.log(err.response);
      console.log("fracasso");
    });
  }

  useEffect(() => {
    buscarHabitos();
  }, []);

  function criarHabito() {
    setNovoHabito(!novoHabito);
  }

  function selecionar(num) {
    if (selecionado.includes(num)) {
      let indice = selecionado.indexOf(num);

      let auxiliar = [...selecionado];

      auxiliar.splice(indice, 1);

      setSelecionado(auxiliar);

    } else {
      setSelecionado([...selecionado, num]);
      
    }
  }

  console.log("selecionado", selecionado);

  function salvarHabito(event) {
    event.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    };

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const promisse = axios.post(
      URL,
      {
        name: nomeHabito,
        days: selecionado,
      },
      config
    );

    promisse.then((response) => {
      setLoading(false);
      criarHabito();
      buscarHabitos();
    });

    promisse.catch((err) => {
      console.log("erro", err);
      alert("errou pra salvar");
      setLoading(false);
    });
  }

  const dias = {
    0: "D",
    1: "S",
    2: "T",
    3: "Q",
    4: "Q",
    5: "S",
    6: "S",
  };

  const listaDias = [0, 1, 2, 3, 4, 5, 6];

  function apagarHabito(item) {
    let confirmacao = prompt("Quer mesmo apagar esse hábito? Digite Sim ");
    if (confirmacao.toLowerCase() === "sim") {
      const config = {
        headers: {
          Authorization: `Bearer ${usuario}`,
        },
      };

      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${item}`;
      const promisse = axios.delete(URL, config);

      promisse.then((response) => {
        buscarHabitos();
      });

      promisse.catch((err) => {
        console.log("erro", err);
        alert("errou pra apagar");
      });
    }
  }

  return habitos.length !== 0 ? (
    <>
      <Container>
        <BarraTopo>
          <p>TrackIt</p>
          <Foto src={imagem} alt={imagem} />
        </BarraTopo>
        <Titulo>
          <h1>Meus Hábitos</h1>
          <AiFillPlusSquare size={30} color={"blue"} onClick={criarHabito} />
        </Titulo>
        <Tarefas>
          {novoHabito ? (
            <Cadastrar>
              <Formulario onSubmit={salvarHabito}>
                <Input
                  type="text"
                  placeholder="Nome do Hábito"
                  required
                  value={nomeHabito}
                  onChange={(e) => setNomeHabito(e.target.value)}
                  disabled={loading ? true : false}
                />
                <Dias>
                  {listaDias.map((item) => {
                    return selecionado.includes(item) ? (
                      <Dia selecionado key={item} onClick={() => {
                        selecionar(item)
                      }}>
                        {dias[item]}
                      </Dia>
                    ) : (
                      <Dia key={item}  onClick={() => selecionar(item)}>
                        {dias[item]}
                      </Dia>
                    );
                  })}
                </Dias>
                <Botoes>
                  <Cancelar onClick={criarHabito}>Cancelar</Cancelar>
                  <Salvar type="submit">
                    {" "}
                    {loading ? (
                      <ThreeDots color="#fff" height={13} />
                    ) : (
                      "Salvar"
                    )}
                  </Salvar>
                </Botoes>
              </Formulario>
            </Cadastrar>
          ) : (
            <></>
          )}
          {habitos.length ? (
            habitos.map((item) => {
              return (
                <Item>
                  <Info>
                    <Descricao>
                      <h1>{item.name}</h1>
                      <Dias>
                  {listaDias.map((item) => {
                    return selecionado.includes(item) ? (
                      <Dia selecionado key={item} onClick={() => {
                        selecionar(item)
                      }}>
                        {dias[item]}
                      </Dia>
                    ) : (
                      <Dia key={item}  onClick={() => selecionar(item)}>
                        {dias[item]}
                      </Dia>
                    );
                  })}      
                  </Dias>
                      
                    </Descricao>
                  </Info>

                  <TrashFill
                    onClick={() => apagarHabito(item.id)}
                    size={22}
                    color={"grey"}
                  />
                </Item>
              );
            })
          ) : (
            <></>
          )}
        </Tarefas>
        <BarraInferior>
          <Link to="/habitos">
            <p>Hábitos</p>
          </Link>
          <Link to="/hoje">
            <p>Hoje</p>
          </Link>
          <Link to="/historico">
            <p>Histórico</p>
          </Link>
        </BarraInferior>
      </Container>
    </>
  ) : (
    <>
      <Container>
        <BarraTopo>
          <p>TrackIt</p>
          <Foto src={imagem} alt={imagem} />
        </BarraTopo>
        <Titulo>
          <h1>Meus Hábitos</h1>
          <AiFillPlusSquare size={30} color={"blue"} onClick={criarHabito} />
        </Titulo>
        <Tarefas>
          <SemHabitos>
            {novoHabito ? (
              <Cadastrar>
                <Formulario onSubmit={salvarHabito}>
                  <Input
                    type="text"
                    placeholder="Nome do Hábito"
                    required
                    value={nomeHabito}
                    onChange={(e) => setNomeHabito(e.target.value)}
                    disabled={loading ? true : false}
                  />
                  <Dias>
                  {listaDias.map((item) => {
                    return selecionado.includes(item) ? (
                      <Dia selecionado key={item} onClick={() => {
                        selecionar(item)
                      }}>
                        {dias[item]}
                      </Dia>
                    ) : (
                      <Dia key={item}  onClick={() => selecionar(item)}>
                        {dias[item]}
                      </Dia>
                    );
                  })}      
                  </Dias>
                  <Botoes>
                    <Cancelar onClick={criarHabito}>Cancelar</Cancelar>
                    <Salvar type="submit">
                      {" "}
                      {loading ? (
                        <ThreeDots color="#fff" height={13} />
                      ) : (
                        "Salvar"
                      )}
                    </Salvar>
                  </Botoes>
                </Formulario>
              </Cadastrar>
            ) : (
              <></>
            )}
            <Mensagem>
              <p>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                para começar a trackear!
              </p>
            </Mensagem>
          </SemHabitos>
        </Tarefas>
        <BarraInferior>
          <p>Hábitos</p>
          <p>Hoje</p>
          <p>Histórico</p>
        </BarraInferior>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #e5e5e5;
`;

const BarraTopo = styled.header`
  width: 100%;
  height: 70px;
  background-color: #126ba5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0%;

  p {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: "Playball", cursive;
    font-weight: 400;
    font-size: 40px;
    color: #fff;
  }
`;

const Titulo = styled.section`
  background-color: #e5e5e5;
  padding-top: 118px;
  padding-left: 18px;
  padding-right: 18px;
  width: 100%;
  height: 50px;
  background-color: #e5e5e5;
  font-family: "Lexend Deca", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  h1 {
    font-size: 23px;
    color: #126ba5;
    padding-bottom: 5px;
  }
`;

const Tarefas = styled.section`
  margin-left: 18px;
  margin-right: 18px;
  overflow-y: scroll;
`;

const Item = styled.article`
  padding-left: 12px;
  padding-right: 12px;
  background-color: #fff;
  width: 100%;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Descricao = styled.div`
  padding: 12px;
  background-color: #fff;
  width: 100%;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Info = styled.div`
  h1 {
    font-size: 20px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    color: #666;
    padding-bottom: 8px;
  }

  p {
    font-size: 13px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    color: #666;
    padding-bottom: 5px;
  }
`;

const CaixaIcone = styled.div`
  width: 69px;
  height: 60px;
  background-color: #ebebeb;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SemHabitos = styled.section`
  margin-left: 18px;
  margin-right: 18px;
`;

const Mensagem = styled.article`
  padding-left: 12px;
  padding-right: 12px;
  background-color: #fff;
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background-color: #e5e5e5;

  p {
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 18px;
    color: #666;
  }
`;

const BarraInferior = styled.footer`
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0%;
  padding-left: 36px;
  padding-right: 36px;

  p {
    font-size: 18px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    color: #52b6ff;
  }
`;

const Foto = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Cadastrar = styled.section`
  height: 180px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 24px;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  height: 45px;
  width: 303px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #666;
  margin-top: 12px;
  &::placeholder {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #dbdbdb;
  }
`;

const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 45px;
  width: 303px;
  margin-top: 29px;
`;

const Dias = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 45px;
  width: 303px;
  margin-top: 8px;
`;

const Dia = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid #d4d4d4;
  color: #d4d4d4;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  background-color: ${props => props.selecionado ? "#00ff00" :"#ff4400"};  
  ` ;

const Salvar = styled.button`
  height: 35px;
  width: 84;
  background-color: #52b6ff;
  border: 1px solid #52b6ff;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cancelar = styled.button`
  height: 20px;
  width: 69;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #52b6ff;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TelaHabitos;
