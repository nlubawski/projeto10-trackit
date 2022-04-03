import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AiFillPlusSquare } from "react-icons/ai";
import { TrashFill } from "@styled-icons/bootstrap/TrashFill";
import UsuarioContext from "./contextos/UsuarioContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function TelaHabitos() {
  const [habitos, setHabitos] = useState([]);

  const [novoHabito, setNovoHabito] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nomeHabito, setNomeHabito] = useState("");
  const [selecionado, setSelecionado] = useState([]);

  const { usuario } = useContext(UsuarioContext);
  console.log("usuario", usuario);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    };
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const promisse = axios.get(URL, config);

    promisse.then((response) => {
      console.log("response", response);
      console.log("data", response.data);
      const { data } = response;
      console.log("sucesso");
      console.log(data);
      setHabitos(data);
    });

    promisse.catch((err) => {
      console.log(err.response);
      console.log("fracasso");
    });
  }, []);

  function criarHabito() {
    setNovoHabito(!novoHabito);
  }

  function selecionar(num) {
    if (selecionado.includes(num)) {
      let indice = selecionado.indexOf(num);
      console.log("indice", indice);
      let auxiliar = [...selecionado];
      console.log("auxiliar", auxiliar);
      auxiliar.splice(indice, 1);
      console.log("auxiliar pos splice", auxiliar);
      setSelecionado(auxiliar);
    } else {
      setSelecionado([...selecionado, num]);
    }
  }

  console.log("selecionado", selecionado);

  // function salvarHabito(event) {
  //   event.preventDefault();
  //   setLoading(true);

  //   const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
  //   const promisse = axios.post(URL,{
  //       email,
  //       password: senha
  //   });

  //   promisse.then((response) => {
  //     const { data } = response;
  //     setUsuario(data.token)
  //     // console.log('dados', data)
  //     // console.log("usuario", usuario)
  //     navigate('/hoje')
  //   });

  //   promisse.catch((err) => {
  //     console.log(err);
  //     alert("falha no login, tente novamente ou cadastre-se");
  //     setLoading(false);
  //   });
  // }

  const dias = {
    0: "D",
    1: "S",
    2: "T",
    3: "Q",
    4: "Q",
    5: "S",
    6: "S",
  };

  function listaDias(){
    let lista = [];
  for (let i = 0; i < 7; i++) {
    selecionado.indexOf(i)
      ? lista.push(
          <Dia key={i}  onClick={() => selecionar(i)}>
            {dias.i}
          </Dia>
        )
      : lista.push(
          <Dia key={i} onClick={() => selecionar(i)}>
            {dias.i}
          </Dia>
        );
  }
  return lista.sort()
  }
  return habitos.length !== 0 ? (
    <>
      <Container>
        <BarraTopo>
          <p>TrackIt</p>
          <Foto
            src="https://tm.ibxk.com.br/2021/11/11/11185008794612.jpg?ims=704x264"
            alt="kakashi"
          />
        </BarraTopo>
        <Titulo>
          <h1>Meus Hábitos</h1>
          <AiFillPlusSquare size={30} color={"blue"} onClick={criarHabito} />
        </Titulo>
        <Tarefas>
          <Item>
            <Info>
              <Descricao>
                <h1>Ler 1 capítulo de livro</h1>
                <div>D S T Q Q S S</div>
              </Descricao>
            </Info>

            <TrashFill size={22} color={"grey"} />
          </Item>
          <Item>
            <Info>
              <Descricao>
                <h1>Ler 1 capítulo de livro</h1>
                <div>D S T Q Q S S</div>
              </Descricao>
            </Info>

            <TrashFill size={22} color={"grey"} />
          </Item>
        </Tarefas>
        <BarraInferior>
          <p>Hábitos</p>
          <p>Hoje</p>
          <p>Histórico</p>
        </BarraInferior>
      </Container>
    </>
  ) : (
    <>
      <Container>
        <BarraTopo>
          <p>TrackIt</p>
          <Foto
            src="https://tm.ibxk.com.br/2021/11/11/11185008794612.jpg?ims=704x264"
            alt="kakashi"
          />
        </BarraTopo>
        <Titulo>
          <h1>Meus Hábitos</h1>
          <AiFillPlusSquare size={30} color={"blue"} onClick={criarHabito} />
        </Titulo>
        <Tarefas>
          <SemHabitos>
            {novoHabito ? (
              <Cadastrar>
                {/* <Formulario onSubmit={salvarHabito}> */}
                <Formulario>
                  <Input
                    type="text"
                    placeholder="Nome do Hábito"
                    required
                    value={nomeHabito}
                    onChange={(e) => setNomeHabito(e.target.value)}
                    disabled={loading ? true : false}
                  />
                  <Dias>
                    {
                      listaDias().map(item => item)
                    }
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
  margin-top: 50px;
  margin-left: 18px;
  margin-right: 18px;
`;

const Mensagem = styled.article`
  padding-left: 12px;
  padding-right: 12px;
  background-color: #fff;
  width: 100%;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background-color: #e5e5e5;

  p {
    width: 100%;
    height: 74px;

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

  `;


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
