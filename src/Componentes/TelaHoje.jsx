import { useState, useEffect, useContext} from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

import UsuarioContext from './contextos/UsuarioContext'

function TelaHoje() {
  const [habitos, setHabitos] = useState([]);

  const {usuario} = useContext(UsuarioContext)
  console.log('usuario', usuario)

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

  console.log(habitos);

  return (
    <>
      <Container>
        <BarraTopo>
          <p>TrackIt</p>
          <Foto
            src="https://tm.ibxk.com.br/2021/11/11/11185008794612.jpg?ims=704x264"
            alt="kakashi"
          />
        </BarraTopo>
        <Dia>
          <h1>Segunda, 17/05</h1>
          <p>Nenhum hábito concluído ainda</p>
        </Dia>
        <Tarefas>
          <Item>
            <Info>
              <h1>Ler 1 capítulo de livro</h1>
              <p>Sequência atual: 3 dias</p>
              <p>Seu recorde: 5 dias</p>
            </Info>
            <CaixaIcone>
            <Icone
              width="36"
              height="28"
              viewBox="0 0 36 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.5686 0.956629C30.1694 0.350274 30.9857 0.00637472 31.8392 8.77323e-05C32.6928 -0.00619925 33.5141 0.325638 34.1237 0.923077C34.7333 1.52052 35.0816 2.33498 35.0926 3.18846C35.1035 4.04195 34.7761 4.86506 34.182 5.4779L16.9915 26.9682C16.6962 27.2862 16.3398 27.5413 15.9437 27.7185C15.5476 27.8957 15.1198 27.9912 14.6859 27.9994C14.252 28.0076 13.821 27.9283 13.4184 27.7662C13.0159 27.6041 12.6502 27.3625 12.3431 27.0559L0.945601 15.6628C0.339937 15.0569 -0.000205509 14.2351 9.31541e-08 13.3784C0.000205695 12.5216 0.340743 11.7001 0.946698 11.0944C1.55265 10.4887 2.37439 10.1486 3.23113 10.1488C4.08788 10.149 4.90945 10.4895 5.51511 11.0955L14.5292 20.1117L29.4831 1.05749C29.5103 1.02282 29.5396 0.989868 29.5708 0.958822L29.5686 0.956629Z"
                fill="white"
              />
            </Icone>
            </CaixaIcone>
          </Item>
        </Tarefas>
        <BarraInferior>
          <Link to="/habitos"><p>Hábitos</p></Link>
          <Link to="/hoje"><p>Hoje</p></Link>
          <Link to="/historico"><p>Histórico</p></Link>
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
`;

const Item = styled.article`
  padding: 12px;
  background-color: #fff;
  width: 100%;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  background-color: #EBEBEB;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`
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


  p{
    font-size: 18px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    color: #52B6FF;  
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
