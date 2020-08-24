import React from 'react';
import {Button, Empty, Table, Tag} from "antd";
import {DeleteOutlined, CheckOutlined} from "@ant-design/icons";

const UserTasksList = ({tasks, onCompleteTask, onDeleteTask, isLoading, setShowCreateTaskModal}) => {
    const columns = [
        {
            title: 'Titulo',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions'
        }
    ]

    const data = tasks.map((task, index) => {
        return {
            key: index,
            title: task.title,
            status: <Tag
                color={
                    task.completed ? 'green'
                        : 'orange'
                }
                key={index}>{
                    task.completed ? 'Completada'
                        : 'Pendiente'
                }</Tag>,
            actions:
                <>
                    {!task.completed && <Button icon={<CheckOutlined />} onClick={ () => onCompleteTask( index ) }/>}
                    <Button danger icon={<DeleteOutlined />} onClick={ () => onDeleteTask( index ) }/>
                </>
        }
    })


    const emptyComponent = () => (
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
                height: 60,
            }}
            description={
                <span>
        No tienes tareas
      </span>
            }
        >
            <Button type="primary" onClick={()=>setShowCreateTaskModal(true)}>Create Tarea</Button>
        </Empty>
    )

    return (
        <>
            <Table columns={columns}
                   dataSource={data}
                   locale={{
                       emptyText:emptyComponent
                   }}
                   loading={isLoading}
            />
        </>
    )
}
export default UserTasksList;