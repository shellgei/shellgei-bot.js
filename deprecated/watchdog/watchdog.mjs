#!/usr/bin/env zx


setInterval(async () => {
	const hasProcess = await $`ps alx | grep -v grep　| grep node | grep enable-source-maps`.nothrow()
	const log = JSON.stringify({output: hasProcess?.stdout, date: new Date()})
	fs.writeFileSync('watchdog.log', log, {flag: 'a'})

	if (!hasProcess?.stdout) {
		fs.writeFileSync('watchdog.log', `restarting... ${new Date()}`, {flag: 'a'})
		$`kill $(ps alx | grep node | grep enable-source-maps | awk '{ print $3 }')`.timeout('1s')
		$`nohup npm run start:production &`.timeout('1s')
	}
}, 10000)

