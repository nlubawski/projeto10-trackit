import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { BsFillCheckSquareFill } from "react-icons/bs";
import UsuarioContext from "./contextos/UsuarioContext";

function TelaHoje() {
  const [habitos, setHabitos] = useState([]);
  const { usuario } = useContext(UsuarioContext);
  const { imagem } = useContext(UsuarioContext);
  let hoje = parseInt(dayjs().format("d"));
  const [habitosHoje, setHabitosHoje] = useState([]);

  function buscarHabitoHoje(){
    const config = {
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    };
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

    const promisse = axios.get(URL, config);

    promisse.then((response) => {
      const { data } = response;
      setHabitosHoje(data);
      console.log("habitos hoj", data);
    });

    promisse.catch((err) => {
      console.log(err.response);
      console.log("fracasso");
    });
  }

  useEffect(() => {
    buscarHabitoHoje()
  }, []);

  function marcarHabito(id) {
    console.log("marcar habito id", id);
    const config = {
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    };
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;

    const promisse = axios.post(URL, null, config);

    promisse.then((response) => {
      console.log("resposta", response.data);
      console.log("marcou o habito");
    });

    promisse.catch((err) => {
      console.log("erro", err);
      console.log("erroooo", err.response);
    });
  }

  function desmarcarHabito(id) {
    console.log("desmarcar habito id", id);
    const config = {
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    };
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;

    const promisse = axios.post(URL, null, config);

    promisse.then((response) => {
      console.log("resposta", response.data);
      console.log("desmarcou o habito");
      buscarHabitoHoje()
    });

    promisse.catch((err) => {
      console.log("erro", err);
      console.log("erroooo", err.response);
      buscarHabitoHoje()
    });
  }

  return (
    <>
      <Container>
        <BarraTopo>
          <p>TrackIt</p>
          <Foto src={imagem} alt={imagem} />
        </BarraTopo>
        <Dia>
          <h1>
            {hoje}, {dayjs().format("DD/MM")}
          </h1>
          <p>Nenhum hábito concluído ainda</p>
        </Dia>
        <Tarefas>
          {habitosHoje.length !== 0 ? (
            habitosHoje.map((item) => {
              return item.done === true ? (
                <Item key={item.id} onClick={() => desmarcarHabito(item.id)}>
                  <Info>
                    <h1>{item.name}</h1>
                    <p>Sequência atual: {item.currentSequence} dias</p>
                    <p>Seu recorde: {item.highestSequence} dias</p>
                  </Info>

                  <CaixaIcone>
                    <BsFillCheckSquareFill size={80} color={"gray"} />
                  </CaixaIcone>
                </Item>
              ) : (
                <Item key={item.id} onClick={() => marcarHabito(item.id)}>
                  <Info>
                    <h1>{item.name}</h1>
                    <p>Sequência atual: {item.currentSequence} dias</p>
                    <p>Seu recorde: {item.highestSequence} dias</p>
                  </Info>

                  <CaixaIcone>
                    <BsFillCheckSquareFill size={80} color={"gray"} />
                  </CaixaIcone>
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

const Dia = styled.section`
  background-color: #e5e5e5;
  padding-top: 98px;
  padding-left: 18px;
  width: 100%;
  height: 50px;
  background-color: #e5e5e5;
  font-family: "Lexend Deca", sans-serif;

  h1 {
    font-size: 23px;
    color: #126ba5;
    padding-bottom: 5px;
  }

  p {
    font-size: 18px;
    color: #bababa;
  }
`;

const Tarefas = styled.section`
  margin-top: 70px;
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 70px;
`;

const Item = styled.article`
  padding: 12px;
  background-color: #fff;
  width: 100%;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 5px;
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
const Icone = styled.svg``;

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

export default TelaHoje;
