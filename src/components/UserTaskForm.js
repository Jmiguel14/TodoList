

import React from "react";
import {Button, Input} from "antd";
import { BookOutlined, PlusOutlined } from '@ant-design/icons';


const UserTaskForm = ({onAddTask}) => (
    <div>
        <Input id='task' style={{width:350}} size="large" placeholder="Ingrese el nombre de la tarea" prefix={<BookOutlined />} />

        <Button type="primary" onClick={onAddTask} icon={<PlusOutlined />}/>
    </div>
)

export default UserTaskForm;