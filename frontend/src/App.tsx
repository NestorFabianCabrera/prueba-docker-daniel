import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { api } from './services/api';
import { Producto } from './types';
import { ProductForm } from './components/ProductForm';

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const fetchProductos = async () => {
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Sistema de Inventario
      </Typography>
      
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {producto.nombre}
                </Typography>
                <Typography color="textSecondary">
                  Categoría: {producto.categoria}
                </Typography>
                <Typography variant="body2">
                  Precio: ${producto.precio}
                </Typography>
                <Typography variant="body2">
                  Stock: {producto.stock} unidades
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="error" onClick={() => handleDelete(producto.id)}>
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpenForm(true)}
      >
        <AddIcon />
      </Fab>

      <ProductForm 
        open={openForm}
        onClose={() => setOpenForm(false)}
        onProductCreated={fetchProductos}
      />
    </Container>
    
  );
}

export default App;
