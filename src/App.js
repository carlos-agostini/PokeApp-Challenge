import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import { Layout, Menu, Typography, Modal } from 'antd';
import './App.css'

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {

  const [reset, setReset] = useState(false); // Agregar estado de reset
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [showResetButton, setShowResetButton] = useState(true); // Agregar estado para controlar la visibilidad

  const showConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const handleConfirmReset = () => {
    localStorage.clear();
    setReset(true);
    setConfirmModalVisible(false);
  };

  const handleCancelReset = () => {
    setConfirmModalVisible(false);
  };

  const handleShowResetButton = () => {
    setShowResetButton(true); // Mostrar el botón
  };

  const handleHideResetButton = () => {
    setShowResetButton(false); // Ocultar el botón
  };

  useEffect(() => {
    if (reset) {
      // Forzar una actualización después de limpiar localStorage
      setReset(false);
    }
  }, [reset]);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#000', padding: 0}}>
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Title style={{ color: '#fff', margin: '4px 0 20px', fontFamily: 'PokemonFont' }} level={2}><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>PokéApp</Link></Title>
            <Menu
              className="custom-header-menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ background: 'transparent', color: '#fff' }}
              items={[
                { key: '1', label: <Link to="/">Home</Link> },
              ]}
            />
            {showResetButton && ( // Mostrar el botón de reinicio si showResetButton es true
            <button className="reset-button" onClick={showConfirmModal}>
              Reset PokeApp
            </button>
            )}
            <Modal
              title="Confirmación"
              open={isConfirmModalVisible}
              onOk={handleConfirmReset}
              onCancel={handleCancelReset}
              okText="Sí"
              cancelText="No"
            >
              ¿Estás seguro de querer reiniciar la Pokédex?
            </Modal>
          </div>

        </Header>
        <Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Switch>
            <Route exact path="/" component={PokemonList}/>
            <Route path="/pokemon/:id" render={(props) => (
              <PokemonDetail {...props} onShowResetButton={handleShowResetButton} onHideResetButton={handleHideResetButton}  />
            )} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>PokéApp ©2023 Created by ABDOTECH / CARLOS AGOSTINI</Footer>
      </Layout>
    </Router>
  );
}

export default App;
