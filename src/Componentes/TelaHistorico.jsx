import styled from "styled-components";

function TelaHistorico() {
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
        <Titulo>
          <h1>Historico</h1>
        </Titulo>
        <SemHabitos>
          <Mensagem>
            <p>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </p>
          </Mensagem>
        </SemHabitos>

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

export default TelaHistorico;
