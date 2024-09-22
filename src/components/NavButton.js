function NavButton({ to, icon, text, onClick }) {
    return (
        <Button
            color="#000"
            component={Link}
            to={to}
            startIcon={icon}
            onClick={onClick}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiButton-startIcon': {
                    margin: 0,
                },
            }}
        >
            {text}
        </Button>
    );
}
