import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function TelaHoje({token}) {
  const [habitos, setHabitos] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const promisse = axios.get(URL, config);

    promisse.then((response) => {
        console.log('response' ,response)
        console.log('data', response.data)
      const { data } = response;
      console.log("sucesso");
      console.log(data)
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
          <img src="" alt="" />
        </BarraTopo>
        <Dia>
          <p>Segunda, 17/05</p>
          <p>Nenhum hábito concluído ainda</p>
        </Dia>
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
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  min-height: 100vh;
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
`;

const Dia = styled.section`
  background-color: #e5e5e5;
  margin-top: 70px;
`;

const BarraInferior = styled.footer`
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0%;
`;

export default TelaHoje;
