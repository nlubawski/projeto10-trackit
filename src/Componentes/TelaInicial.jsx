import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function TelaInicial(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const {salvarToken} = props

  function fazerLogin(event) {
    event.preventDefault();

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const promisse = axios.post(URL,{
        email,
        password: senha
    });

    promisse.then((response) => {
      const { data } = response;
      salvarToken(data.token)
      navigate('/hoje')
    });

    promisse.catch((err) => {
      console.log(err);
      alert("oi");
    });
  }

  return (
    <>
      <Container>
        <Logo
          width="182"
          height="179"
          viewBox="0 0 182 179"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="96.4671"
            cy="84.3413"
            rx="71.1377"
            ry="7.81437"
            fill="#E6E7E8"
          />
          <path
            d="M51.1975 19.4012V34.7605L69.2514 42.0359V19.4012H51.1975Z"
            fill="#8FC549"
          />
          <path
            d="M75.449 11.0479V46.0779L93.5029 53.3533V11.0479H75.449Z"
            fill="#E75766"
          />
          <path
            d="M100.24 0V56.0479L118.293 63.3233V0H100.24Z"
            fill="#8FC549"
          />
          <path
            d="M12.3953 68.1736V87.3054L49.3114 57.3952L119.102 87.3054L155.21 60.3593L158.443 68.1736L167.335 40.9581L139.85 45.5389L147.126 48.7724L119.102 69.2515L49.3114 38.8024L12.3953 68.1736Z"
            fill="#126BA5"
          />
          <path
            d="M46.6181 113.904L36.8917 113.49C36.4318 113.49 34.9142 116.249 32.3388 121.768C29.7635 127.24 27.5331 132.552 25.6476 137.703C23.7621 142.853 22.8193 146.578 22.8193 148.878C22.8193 151.131 23.5321 152.258 24.9578 152.258C26.4294 152.258 28.2689 150.763 30.4763 147.774C30.7063 147.498 30.9362 147.36 31.1661 147.36C31.3961 147.36 31.5111 147.567 31.5111 147.981C31.5111 148.395 31.1891 149.154 30.5453 150.257C29.9475 151.361 29.1427 152.557 28.1309 153.845C27.1192 155.086 25.8085 156.19 24.199 157.156C22.5894 158.167 20.9338 158.673 19.2323 158.673C16.7029 158.673 15.4382 156.926 15.4382 153.431C15.4382 149.108 17.6227 141.75 21.9915 131.356C25.1187 124.044 27.993 117.974 30.6143 113.145H29.7175L22.6124 113.007C18.6574 113.007 15.2083 113.513 12.2651 114.525C10.6555 115.077 9.36782 115.904 8.40207 117.008C7.48231 118.066 7.02243 119.354 7.02243 120.871L7.57429 123.768C7.57429 124.228 7.34435 124.458 6.88447 124.458C6.28662 124.458 5.80375 123.883 5.43584 122.734C5.06794 121.538 4.88399 120.503 4.88399 119.629C4.88399 117.468 5.38986 115.629 6.40159 114.111C7.41333 112.593 8.79297 111.444 10.5405 110.662C13.8517 109.19 17.5077 108.454 21.5087 108.454C25.5096 108.454 30.0394 108.707 35.0981 109.213C40.1568 109.673 44.7556 109.903 48.8945 109.903C53.0334 109.903 55.7237 109.259 56.9654 107.972C57.1034 108.293 57.1724 108.615 57.1724 108.937C57.1724 110.455 56.2066 111.674 54.2751 112.593C52.3436 113.467 49.7913 113.904 46.6181 113.904ZM50.7123 129.425L54.2304 129.494H54.9202C54.2304 130 53.2417 131.494 51.954 133.978C50.7123 136.461 49.7696 138.347 49.1257 139.634C48.5279 140.876 47.8381 142.577 47.0563 144.739C46.3205 146.854 45.9525 148.579 45.9525 149.913C45.9525 151.246 46.4124 151.913 47.3322 151.913C47.93 151.867 48.7578 151.453 49.8155 150.671C50.9193 149.844 51.816 148.993 52.5058 148.119C53.2416 147.199 54.0234 146.05 54.8512 144.67C55.725 143.244 56.4608 142.026 57.0587 141.014C57.7025 139.956 58.0704 139.427 58.1624 139.427C58.4843 139.427 58.6452 139.864 58.6452 140.738C58.6452 141.566 58.4153 142.371 57.9554 143.152C55.9779 146.417 54.3454 148.924 53.0577 150.671C51.77 152.419 50.2064 154.029 48.3669 155.5C46.5734 156.926 44.9408 157.639 43.4692 157.639C40.8479 157.639 39.5372 155.707 39.5372 151.844C39.5372 149.223 40.0431 146.257 41.0548 142.945C42.0666 139.634 43.5612 136.438 45.5387 133.357C43.9291 134.645 42.3195 135.288 40.7099 135.288C40.204 135.288 39.6752 135.173 39.1233 134.943C35.8582 141.382 34.0876 144.601 33.8117 144.601C33.5818 144.601 33.4668 144.233 33.4668 143.497C33.4668 142.715 33.7427 141.658 34.2946 140.324C34.8924 138.944 35.5133 137.634 36.1571 136.392C36.8469 135.15 37.2148 134.461 37.2608 134.323C35.6052 133.495 34.7775 132.161 34.7775 130.322C34.7775 129.402 35.0534 128.574 35.6052 127.838C36.2031 127.103 37.0079 126.735 38.0196 126.735C39.0314 126.735 39.8591 127.057 40.503 127.7C40.411 127.976 40.365 128.39 40.365 128.942C40.365 130.184 40.8019 131.172 41.6757 131.908C42.5954 132.598 43.6991 132.943 44.9868 132.943C45.3547 132.943 45.6306 132.92 45.8146 132.874C47.4242 130.575 49.0567 129.425 50.7123 129.425ZM83.6124 129.563L87.0615 129.632H87.7513C86.2337 130.874 84.3712 134.024 82.1638 139.082C79.9564 144.095 78.8527 147.751 78.8527 150.051C78.8527 151.246 79.2666 151.844 80.0943 151.844C82.7616 151.844 86.1648 147.912 90.3037 140.048C90.4876 139.726 90.6486 139.565 90.7866 139.565C91.0625 139.565 91.2004 140.002 91.2004 140.876C91.2004 141.704 90.9705 142.509 90.5106 143.29C84.8541 152.81 80.1173 157.57 76.3003 157.57C73.817 157.57 72.5753 155.661 72.5753 151.844C72.5753 148.993 73.0582 146.188 74.0239 143.428C68.7813 152.718 63.9296 157.363 59.4687 157.363C56.3875 157.363 54.8469 155.247 54.8469 151.016C54.8469 147.797 55.5367 144.532 56.9164 141.221C58.342 137.91 60.3655 135.104 62.9868 132.805C65.6081 130.46 68.4824 129.287 71.6096 129.287C73.0812 129.287 74.4608 129.632 75.7485 130.322C77.0361 130.966 77.8869 132.023 78.3008 133.495C78.8067 132.437 79.5885 131.517 80.6462 130.736C81.7039 129.954 82.6927 129.563 83.6124 129.563ZM77.8869 134.116C77.427 132.644 76.3463 131.908 74.6448 131.908C71.6096 131.908 68.6663 134.024 65.8151 138.255C62.9638 142.44 61.5382 146.188 61.5382 149.499C61.5382 150.924 62.09 151.637 63.1937 151.637C64.3894 151.637 65.7921 150.901 67.4016 149.43C69.0112 147.912 70.4599 146.142 71.7475 144.118C74.5988 139.611 76.6452 136.277 77.8869 134.116ZM115.458 139.496C115.734 139.496 115.872 139.933 115.872 140.807C115.872 141.681 115.481 142.761 114.7 144.049C113.964 145.337 113.366 146.326 112.906 147.015C112.492 147.659 111.756 148.717 110.699 150.189C109.641 151.66 108.721 152.718 107.939 153.362C107.158 154.006 106.169 154.764 104.973 155.638C102.95 157.11 100.305 157.846 97.0402 157.846C93.821 157.846 91.4757 157.041 90.004 155.431C88.5784 153.776 87.8656 151.637 87.8656 149.016C87.8656 144.187 89.5672 139.772 92.9703 135.771C96.4194 131.724 100.466 129.701 105.111 129.701C107.181 129.701 108.836 130.253 110.078 131.356C111.319 132.414 111.94 133.702 111.94 135.219C111.94 136.691 111.526 137.979 110.699 139.082C109.871 140.186 108.928 140.738 107.87 140.738C105.801 140.738 104.766 139.887 104.766 138.186C104.766 137.634 105.341 137.105 106.491 136.599C106.951 136.415 107.365 136.07 107.732 135.564C108.1 135.058 108.284 134.392 108.284 133.564C108.284 132.368 107.64 131.77 106.353 131.77C103.594 131.77 100.857 133.771 98.1439 137.772C95.4306 141.773 94.074 145.659 94.074 149.43C94.074 153.155 95.7066 155.017 98.9717 155.017C103.525 155.017 107.962 151.499 112.285 144.463C113.159 143.083 113.872 141.911 114.424 140.945C115.022 139.979 115.366 139.496 115.458 139.496ZM143.493 143.428C141.883 146.142 140.25 148.602 138.595 150.809C135.054 155.408 131.559 157.708 128.11 157.708C126.224 157.708 124.798 156.765 123.833 154.879C122.913 152.994 122.453 150.901 122.453 148.602C122.453 144.003 123.143 141.704 124.523 141.704C126.684 141.704 128.684 141.221 130.524 140.255C132.364 139.243 133.283 137.933 133.283 136.323C133.283 135.035 132.547 134.392 131.076 134.392C127.903 134.392 124.385 137.841 120.522 144.739C120.154 145.429 119.372 147.038 118.176 149.568C117.026 152.051 115.992 153.937 115.072 155.224C114.198 156.512 113.324 157.156 112.451 157.156H108.243C109.668 154.488 111.761 149.108 114.52 141.014C117.325 132.874 119.395 127.424 120.729 124.665C120.775 124.573 121.05 123.975 121.556 122.872C122.108 121.768 122.476 121.009 122.66 120.595C122.89 120.181 123.304 119.4 123.902 118.25C124.5 117.1 124.982 116.249 125.35 115.697C125.718 115.146 126.224 114.364 126.868 113.352C127.512 112.294 128.087 111.49 128.592 110.938C129.098 110.386 129.696 109.742 130.386 109.006C131.076 108.224 131.72 107.65 132.318 107.282C133.881 106.362 135.307 105.902 136.594 105.902C139.124 105.902 140.388 107.052 140.388 109.351C140.388 112.57 138.434 116.847 134.525 122.182C130.662 127.47 126.293 132.483 121.418 137.22L120.177 140.669C122.384 137.818 124.89 135.334 127.696 133.219C130.501 131.057 133.076 129.977 135.422 129.977C136.755 129.977 137.79 130.299 138.526 130.943C139.308 131.586 139.699 132.46 139.699 133.564C139.699 136.093 138.572 138.14 136.318 139.703C134.111 141.221 131.559 142.21 128.661 142.669C129.075 147.452 129.742 150.372 130.662 151.43C131.122 151.936 131.697 152.189 132.386 152.189C133.076 152.189 134.019 151.775 135.215 150.947C136.41 150.12 137.376 149.223 138.112 148.257C138.894 147.245 139.699 146.05 140.526 144.67C141.4 143.29 142.136 142.095 142.734 141.083C143.378 140.071 143.746 139.565 143.838 139.565C144.113 139.565 144.251 140.025 144.251 140.945C144.251 141.819 143.998 142.646 143.493 143.428ZM136.732 107.696C134.157 107.696 129.65 115.973 123.212 132.529C129.098 125.631 133.237 119.813 135.629 115.077C137.008 112.593 137.698 110.547 137.698 108.937C137.698 108.109 137.376 107.696 136.732 107.696ZM154.953 109.006H170.543C167.37 111.444 163.001 118.986 157.436 131.632C156.011 134.852 154.378 139.082 152.538 144.325C150.745 149.522 149.848 153.316 149.848 155.707C149.848 156.351 149.94 156.834 150.124 157.156H141.225C142.513 151.591 145.226 143.865 149.365 133.978C154.884 120.825 158.448 113.352 160.057 111.559C156.148 111.651 152.171 112.455 148.124 113.973C144.123 115.445 141.8 117.215 141.156 119.285C141.11 119.423 141.018 119.492 140.88 119.492C140.467 119.492 140.26 119.193 140.26 118.595C140.26 118.503 140.306 118.273 140.398 117.905C141.271 115.376 142.536 113.421 144.192 112.041C145.847 110.662 147.457 109.811 149.02 109.489C150.63 109.167 152.607 109.006 154.953 109.006ZM181.806 117.629C179.552 119.193 177.023 123.194 174.218 129.632H181.185L181.254 129.701C181.254 129.931 181.001 130.345 180.495 130.943C179.989 131.494 179.552 131.77 179.184 131.77H173.252C169.619 140.784 167.802 146.578 167.802 149.154C167.802 150.901 168.354 151.775 169.458 151.775C171.067 151.775 172.953 150.395 175.114 147.636C175.62 147.038 176.287 146.027 177.115 144.601C179.23 141.198 180.334 139.496 180.426 139.496C180.702 139.496 180.84 139.864 180.84 140.6C180.794 142.348 178.885 145.751 175.114 150.809C173.873 152.465 172.378 154.006 170.631 155.431C168.883 156.857 167.296 157.57 165.871 157.57C163.249 157.57 161.939 155.73 161.939 152.051C161.939 148.97 162.675 145.429 164.146 141.428V141.359C163.272 142.968 162.514 144.164 161.87 144.946C161.272 145.728 160.927 146.119 160.835 146.119C160.651 146.119 160.559 145.843 160.559 145.291C160.559 144.693 160.858 143.75 161.456 142.463C162.1 141.175 162.951 139.496 164.008 137.427C165.112 135.357 166.009 133.472 166.699 131.77H162.077C161.939 131.77 161.87 131.678 161.87 131.494C161.87 131.264 162.031 130.897 162.353 130.391C162.721 129.885 162.997 129.632 163.181 129.632H168.423C171.734 121.676 175.091 117.698 178.495 117.698C180.472 117.698 181.576 117.675 181.806 117.629Z"
            fill="#126BA5"
          />
        </Logo>

        <Formulario onSubmit={fazerLogin}>
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Botao type="submit">Entrar</Botao>
          <Texto>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
          </Texto>
        </Formulario>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Logo = styled.svg`
  width: 180px;
  height: 180px;
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
  margin-bottom: 6px;
  &::placeholder {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #dbdbdb;
  }
`;
const Botao = styled.button`
  height: 45px;
  width: 303px;
  background-color: #52b6ff;
  border: 1px solid #52b6ff;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  margin-bottom: 25px;
`;
const Texto = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #52b6ff;
`;

export default TelaInicial;
