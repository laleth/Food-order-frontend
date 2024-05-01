import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../Global';
import { notification } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';
import "../style/bill.css"

function Bill({ Total }) {
    const [custname, setCustname] = useState("");
    const [phone, setPhone] = useState("");
    const [taxRate] = useState(0.1);
    const [paymentmode, setPayment] = useState("");
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const colors2 = ['#3f5efb', '#8355c7', '#b64fa0', '#3f5efb'];
    const colors1 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];

    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    useEffect(() => {
        setTotal(Total);
        setSubtotal(calculateSubtotal(Total));
    }, [Total]);

    const calculateTax = (amount) => {
        return amount * taxRate;
    };

    const calculateSubtotal = (amount) => {
        return amount + calculateTax(amount);
    };

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const chargebill = async () => {
        if (!paymentmode) {
            openNotification('error', 'Payment Mode Error', 'Please select a payment mode.');
            return;
        }
        try {
            const token = localStorage.getItem('Authorization');
            const response = await axios.post(`${API}/bills/charge-bill`, {
                customerName: custname,
                customerPhoneNumber: phone,
                totalAmount: total,
                tax: calculateTax(total),
                subTotal: subtotal,
                paymentMode: paymentmode,
            }, {
                headers: {
                    Authorization: `${token}`,
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                openNotification('success', 'Bill Saved Successful', 'Your Bill has been Saved Successfully.');
                setCustname("");
                setPhone("");
                setPayment("");
            } else {
                console.log(`Error: ${response.data.message}`);
                openNotification('error', 'Bill Error', 'There was an error during Bill Saving.');
            }
        } catch (error) {
            console.error('Error during bill charging:', error);
        }
    };

    const deleteBills = async () => {
        try {
            const token = localStorage.getItem('Authorization');
            const response = await axios.delete(`${API}/bills/delete-bills`, {
                headers: {
                    Authorization: `${token}`,
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                openNotification('success', 'Bills Deleted Successfully', 'All bills have been deleted successfully.');
            } else {
                console.log(`Error: ${response.data.message}`);
                openNotification('error', 'Delete Error', 'There was an error during deletion.');
            }
        } catch (error) {
            console.error('Error during bill deletion:', error);
        }
    };

    return (
        <div className="bill-container">
            <h2>Bill Details</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="custname">Customer Name:</label>
                    <input type='text' id="custname" placeholder='Customer Name' onChange={(e) => setCustname(e.target.value)} value={custname} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type='text' id="phone" placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} value={phone} />
                </div>
                <div className="form-group">
                    <label>Total Amount:</label>
                    <input type='text' placeholder='Total Amount' value={total} readOnly />
                </div>
                <div className="form-group">
                    <label>Tax:</label>
                    <input type='text' placeholder='Tax' value={calculateTax(total)} readOnly />
                </div>
                <div className="form-group">
                    <label>Sub Total:</label>
                    <input type='text' placeholder='Sub Total' value={subtotal} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentmode">Payment Mode:</label>
                    <select id="paymentmode" onChange={(e) => setPayment(e.target.value)} value={paymentmode}>
                        <option value="">Select Payment Mode</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>
                <Space>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                                    lineWidth: 0,
                                },
                            },
                        }}
                    >
                        <Button type="primary" size="large" onClick={chargebill} className='confirm-btn'>
                            Confirm Bill
                        </Button>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: `linear-gradient(90deg,  ${colors1.join(', ')})`,
                                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors1).join(', ')})`,
                                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors1).join(', ')})`,
                                    lineWidth: 0,
                                },
                            },
                        }}
                    >
                        <Button type="primary" size="large" onClick={deleteBills}>
                            Delete Bills
                        </Button>
                    </ConfigProvider>
                </Space>
            </form>
        </div>
    );
}

export default Bill;
