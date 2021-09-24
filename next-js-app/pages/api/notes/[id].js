import nc from 'next-connect';
import notes from '../../../src/data/data';

const getNote = id => notes.find(n => n.id === parseInd(id));

const handler = nc()
    .get((req,res) => {
        const note = getNote(req.query.id)

        if (!note) {
            res.statusCode(404);
            res.end();
            return;
        }

        res.json({ data: note })
    })
    .patch((req, res) => {
        const note = getNote(req.query.id);

        if (!note) {
            res.statusCode(404);
            res.end();
            return;
        };

        const i = notes.findIndex(n => n.id === parseInt(req.query.id));
        const updatedNote = {...note, ...req.body};
        notes[i] = updatedNote;
        res.json({data: updatedNote});
    })
    .delete((req, res) => {
        const note = getNote(req.query.id);

        if (!note) {
            res.statusCode(404);
            res.end();
            return;
        }

        const i = notes.findIndex(n => n.id === parseInd(req.query.id));

        notes.splice(i, 1);
        res.json({data: req.query.id});
    })

export default handler;