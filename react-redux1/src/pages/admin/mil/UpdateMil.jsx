import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const UpdateMil = ({ openModal, setOpenModal, milId, getMils }) => {
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [name, setName] = useState("")
    const [mil, setMil] = useState()
    const [loading, setLoading] = useState(false)
    

    // get single
    const getMil = async () => {
        setLoading(true)
        await axios.get(`http://localhost:8080/api/mil/${milId}`).then((response) => {
            setMil(response?.data.data)
            setLoading(false)
        }, (err) => {
            console.log(err.message)
            setLoading(false)

        })
    }

    // Update
    const updateById = async (e) => {
        e.preventDefault()
        let formData = {
            id:milId,
            name,
        }
        await axios.put("http://localhost:8080/api/mil", formData).then((response) => {
            getMils()
            toast.success(response?.data.message)
            handleClose()
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
        })
    }

    React.useEffect(() => {
        getMil()
    }, [])
    return (
        <>
            {loading ? <CircularProgress /> :
                <div>
                    <Button onClick={handleOpen}>میلی لیتر</Button>
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">مقدار میلی لیتر</label>
                                    <input type="text"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        onChange={(e) => setName(e.target.value)}
                                        defaultValue={mil?.name} />

                                </div>


                                <br />
                                <br />
                                <button type="submit"
                                    className="btn btn-primary"
                                    onClick={updateById}>ویرایش</button>
                            </form>
                        </Box>
                    </Modal>
                </div>}
        </>
    );
}


export default React.memo(UpdateMil)