export function toView(monthlyBudget) {

    let convertedBudget = [];
    for(i = 0; i < monthlyBudget.length; ++i){
        let dto = new BudgetDTO(monthlyBudget[i].amount,
                                  monthlyBudget[i].dateFrom,
                                  monthlyBudget[i].dateTo,
                                  monthlyBudget[i].id,
                                  monthlyBudget[i].name,
                                  monthlyBudget[i].total,
                                  monthlyBudget[i].transactionTypeId);

        convertedBudget.push(dto);
    }

    return convertedBudget;
}

export function toModel(monthlyBudget) {

}

class BudgetDTO {

    constructor(amount, dateFrom, dateTo, id, name, total, transactionTypeId){
        this.amount = amount;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.id = id;
        this.name = name;
        this.total = (total == null) ? "0" : total;
        this.transactionTypeId = transactionTypeId;
    }

}