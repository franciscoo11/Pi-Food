import React from 'react';
import styles from './RecipeCard.module.css'

export class RecipeCard extends React.Component{

    render(){
        const { id, title, img, typeDiets } = this.props;
        return (
            <div key= {id} className= {styles.card}>
                <div className={styles.cd}>
                <h3>{title}</h3>
                
                <img className={styles.cardimg}src={img} alt="img recipe" width="200px" height="250px" />
                <div className={styles.tipes}> {typeDiets.map(t => <h5 key={t.name}>{t.name}</h5>)} </div> 
                </div>
            </div>
        )
    }
}