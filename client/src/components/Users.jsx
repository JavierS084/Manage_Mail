/*
import { useRouter } from "next/navigation";

export default async function Users({ users }) {
  const router = useRouter();
  return (
    <ul>
      {users.map((item) => (
        <li
          key={item.id}
          onClick={() => {
            router.push(`/users/${item.uuid}`);
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
*/