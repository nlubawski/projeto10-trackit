import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UsuarioContext from "./contextos/UsuarioContext";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

function TelaHistorico() {
  const { imagem } = useContext(UsuarioContext);
  const { usuario } = useContext(UsuarioContext);
  const {porcentagem} = useContext(UsuarioContext)
  const [historico, setHistorico] = useState([]);

  function buscarHistorico() {
    const config = {
      headers: {
        Authorization: `Bearer ${usuario}`,
      },
    };
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";

    const promisse = axios.get(URL, config);

    promisse.then((response) => {
      const { data } = response;
      setHistorico(data);
    });

    promisse.catch((err) => {
      console.log(err.response);
      console.log("fracasso");
    });
  }

  useEffect(() => {
    buscarHistorico();
  }, []);

  console.log("historico", historico);

  return (
    <>
      <Container>
        <BarraTopo>
          <p>TrackIt</p>
          <Foto src={imagem} alt={imagem} />
        </BarraTopo>
        <Titulo>
          <h1>Historico</h1>
        </Titulo>
        {historico.length !== 0 ? (
          historico.map((item) => {
            return (
              <Item key={item.day}>
                <Info>
                  <h1>Dia: {item.day}</h1>
                  {item.habits.map((habito) => {
                    return (
                      <Habito key={habito.id}>
                        <p>Nome do hábito: {habito.name}</p>
                        <p>Feito: {habito.done ? "SIM" : "Não"} </p>
                      </Habito>
                    );
                  })}
                </Info>
              </Item>
            );
          })
        ) : (
          <SemHabitos>
            <Mensagem>
              <p>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                para começar a trackear!
              </p>
            </Mensagem>
          </SemHabitos>
        )}

        <BarraInferior>
          <Link to="/habitos">
            <p>Hábitos</p>
          </Link>
          <Link to="/hoje">
          <Progresso>
          <CircularProgressbar
                value={porcentagem*100} 
                size={12}
                text="Hoje"
                background
                backgroundPadding={6}
                styles={buildStyles({
                    backgroundColor: "#5cbcf0",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent",
                })}
            /></Progresso>
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
  margin-bottom: 50px;

  h1 {
    font-size: 23px;
    color: #126ba5;
    padding-bottom: 5px;
  }
`;

const SemHabitos = styled.section`
  margin-left: 18px;
  margin-right: 18px;
`;

const Mensagem = styled.article`
  padding-left: 18px;
  padding-right: 18px;
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

const Item = styled.section`
  min-height: 94px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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

const Habito = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    padding-left: 10px;
  }
`;

const Progresso = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 40px;
`

export default TelaHistorico;
