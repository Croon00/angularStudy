import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root", // ✅ 이게 있어야 앱 전체에서 자동 주입 가능!
})
export class ServersService {
  private servers = [
    {
      id: 1,
      name: "Productionserver",
      status: "online",
    },
    {
      id: 2,
      name: "Testserver",
      status: "offline",
    },
    {
      id: 3,
      name: "Devserver",
      status: "offline",
    },
  ];

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    return server;
  }

  updateServer(id: number, serverInfo: { name: string; status: string }) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
