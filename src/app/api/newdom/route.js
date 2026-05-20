import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs/promises";

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout);
    });
  });
}

export async function POST(req) {

    // re
    return NextResponse.json({},{status:400});

  const { domain, ip } = await req.json();

  if (!domain || !ip) {
    return NextResponse.json(
      { success: false, message: "domain and ip required" },
      { status: 400 }
    );
  }

  try {
    const zonePath = `/etc/bind/zones/db.${domain}`;
    const bindFile = "/etc/bind/named.conf.local";

    // 1. CHECK duplicate zone file
    try {
      await fs.access(zonePath);
      return NextResponse.json({
        success: false,
        message: "Zone already exists"
      });
    } catch {}

    // 2. CHECK duplicate in named.conf.local
    const bindConfig = await fs.readFile(bindFile, "utf-8");
    if (bindConfig.includes(`zone "${domain}"`)) {
      return NextResponse.json({
        success: false,
        message: "Zone already registered in BIND"
      });
    }

    // 3. create zone file
    const zoneContent = `
$TTL 86400
@   IN  SOA ns1.${domain}. admin.${domain}. (
        2026010101 ; Serial
        3600
        1800
        604800
        86400 )

    IN  NS  ns1.${domain}.
    IN  NS  ns2.${domain}.

ns1 IN  A   ${ip}
ns2 IN  A   ${ip}

@   IN  A   ${ip}
www IN  A   ${ip}
`;

    await fs.writeFile(zonePath, zoneContent);

    // 4. append safely
    const newZone = `
zone "${domain}" {
    type master;
    file "${zonePath}";
};
`;

    await fs.appendFile(bindFile, newZone);

    // 5. reload bind
    await run("rndc reload");

    return NextResponse.json({
      success: true,
      message: "Zone created successfully"
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.toString()
    }, { status: 500 });
  }
}