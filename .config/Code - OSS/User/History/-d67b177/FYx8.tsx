import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "./ToDoList";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../App";

const TodoItem = ({ todo }: { todo: Todo }) => {
    const {mutate:updateTodo, isPending:isUpdating} = useMutation({
        mutationKey:["updateTodo"],
        mutationFn:async() => {
            if(todo.completed) return alert("Todo is already completed")
            try {
                const res = await fetch(BASE_URL + `/todos/${todo._id}`,{
                    method:"PATCH",
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Couldn't reach this todo")
                }
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })
	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={"gray.600"}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
			>
				<Text
					color={todo.completed ? "green.200" : "yellow.100"}
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>
				{todo.completed && (
					<Badge ml='1' colorScheme='green'>
						Done
					</Badge>
				)}
				{!todo.completed && (
					<Badge ml='1' colorScheme='yellow'>
						In Progress
					</Badge>
				)}
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
					if(!isUpdating && <FaCheckCircle size={20} />)
                    if(isUpdating && <Spinner size={"sm"} />)
				</Box>
				<Box color={"red.500"} cursor={"pointer"}>
					<MdDelete size={25} />
				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;