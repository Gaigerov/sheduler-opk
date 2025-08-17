const port = process.env.PORT || 3002;
server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
});
