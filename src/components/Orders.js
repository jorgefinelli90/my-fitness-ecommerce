import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Box, Typography, Collapse, IconButton, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = auth.currentUser.uid;
            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, where('userId', '==', userId)); // Filtrar por userId

            const querySnapshot = await getDocs(q);
            const userOrders = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setOrders(userOrders);
        };

        fetchOrders();
    }, []);

    const handleExpandClick = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Órdenes Realizadas
            </Typography>

            {orders.length === 0 ? (
                <Typography>No has realizado ninguna orden.</Typography>
            ) : (
                <List>
                    {orders.map((order) => (
                        <Box key={order.id} mb={2}>
                            <ListItem button onClick={() => handleExpandClick(order.id)}>
                                <ListItemText
                                    primary={`Orden: ${order.id}`}
                                    secondary={`Total: $${order.totalPrice.toFixed(2)} - Estado: ${order.status}`}
                                />
                                <IconButton
                                    onClick={() => handleExpandClick(order.id)}
                                    aria-expanded={expandedOrderId === order.id}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </ListItem>

                            <Collapse in={expandedOrderId === order.id} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h6">Detalles de la Orden</Typography>
                                    <Typography variant="body2">Dirección: {order.address.fullName}, {order.address.addressLine}, {order.address.city}, {order.address.country}</Typography>
                                    <Typography variant="body2">Código Postal: {order.address.postalCode}</Typography>
                                    <List>
                                        {order.cartItems.map((item, index) => (
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={item.name}
                                                    secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default Orders;
