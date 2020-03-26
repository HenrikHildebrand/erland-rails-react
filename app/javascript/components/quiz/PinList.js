<div style={styles.divMargins}>
<Paper>
    <Table className="do-transition" aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell><h3>Locations</h3></TableCell>
                {
                    this.showingExtraCells() ? 
                    <TableCell /> : null 
                }
            </TableRow>
        </TableHead>
        <TableBody className="do-transition">
            {this.state.pinLocations.map((pin, index) => {
                return(
                    <TableRow key={index} onClick={() => this.setLocation(pin.location)} className="do-transition erland-table-row">
                        <TableCell component="th" scope="row">
                            {pin.name}
                        </TableCell>
                        {
                            this.showingExtraCells() ? 
                            <TableCell className="do-transition" >
                                { pin.show ? "test" : null}
                            </TableCell> : null
                        }
                    </TableRow>
                );
            })}
        </TableBody>
    </Table>
</Paper>
</div>